# frozen_string_literal: true

module Api
  module V1
    class GeoPointsController < Api::V1::ApplicationController
      before_action :authenticate_user!, except: %i[index show]
      before_action :check_authorship!, only: %i[update destroy]

      def index
        geo_points = GeoPoint.all.map(&:json)

        render json: { geoPoints: geo_points }.to_json
      end

      def show
        render json: { geoPoint: geo_point.json }.to_json
      end

      def create
        if build_geo_point.save
          broadcast_action_to_channel(:create)
          action_success
        else
          action_failure
        end
      end

      def update
        if geo_point.update(geo_point_params)
          broadcast_action_to_channel(:update)
          action_success
        else
          action_failure
        end
      end

      def destroy
        if geo_point.destroy
          broadcast_action_to_channel(:destroy)
          action_success
        else
          action_failure
        end
      end

      private

      def check_authorship!
        raise Authentication::NotPermitted unless current_user.id == geo_point.user_id
      end

      def broadcast_action_to_channel(action)
        ActionCable.server.broadcast('geo_points_channel', action: action, geoPoint: geo_point.json)
      end

      def action_success
        render json: { success: true }.to_json
      end

      def action_failure
        render json: { success: false, errors: geo_point.errors.messages }.to_json
      end

      def geo_point
        @geo_point ||= GeoPoint.find(params[:id])
      end

      def build_geo_point
        @geo_point = current_user.geo_points.build(geo_point_params)
      end

      def geo_point_params
        return nil unless params.fetch(:geoPoint, false)

        params.require(:geoPoint).permit(:latitude, :longitude, :rad_value, :comment)
      end
    end
  end
end
