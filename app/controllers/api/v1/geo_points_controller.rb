# frozen_string_literal: true

module Api
  module V1
    class GeoPointsController < Api::V1::ApplicationController
      # TODO: uncomment this at [#ZN-27]
      # before_action :authenticate_user!, except: %i[index show]

      def index
        geo_points = GeoPoint.all.map { |gp| serialize_geo_point(gp) }

        render json: { geoPoints: geo_points }.to_json
      end

      def show
        render json: { geoPoint: serialize_geo_point(geo_point) }.to_json
      end

      def create
        if new_geo_point.save
          render json: { success: true, geoPoint: serialize_geo_point(geo_point) }.to_json
        else
          render json: { success: false, errors: geo_point.errors.messages }.to_json
        end
      end

      def update
        if geo_point.update(geo_point_params)
          render json: { success: true, geoPoint: serialize_geo_point(geo_point) }.to_json
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

      def geo_point
        @geo_point ||= GeoPoint.find(params[:id])
      end

      def new_geo_point
        @geo_point = GeoPoint.new(geo_point_params)
      end

      def geo_point_params
        return nil unless params.fetch(:geoPoint, false)

        params.require(:geoPoint).permit(:latitude, :longitude, :rad_value, :comment)
      end
    end
  end
end
