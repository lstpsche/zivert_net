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
          render json: { success: true, geoPoint: geo_point.json }.to_json
        else
          render json: { success: false, errors: geo_point.errors.messages }.to_json
        end
      end

      def update
        if geo_point.update(geo_point_params)
          render json: { success: true, geoPoint: geo_point.json }.to_json
        else
          render json: { success: false, errors: geo_point.errors.messages }.to_json
        end
      end

      def destroy
        if geo_point.destroy
          render json: { success: true }.to_json
        else
          render json: { success: false, errors: geo_point.errors.messages }.to_json
        end
      end

      private

      def check_authorship!
        raise Authentication::NotPermitted unless current_user.id == geo_point.user_id
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
