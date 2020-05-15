# frozen_string_literal: true

module Api
  module V1
    class GeoPointsController < ApplicationController
      before_action :authenticate_user!

      def index
        geo_points = GeoPoint.all.map { |gp| serialize_geo_point(gp) }

        render json: { geo_points: geo_points }.to_json
      end

      def show
        render json: { geo_point: serialize_geo_point(geo_point) }.to_json
      end

      def create
        if new_geo_point.save
          render json: { success: true, geo_point: serialize_geo_point(geo_point) }.to_json
        else
          render json: { success: false, errors: geo_point.errors.message }.to_json
        end
      end

      def update
        if geo_point.update(geo_point_params)
          render json: { success: true, geo_point: serialize_geo_point(geo_point) }.to_json
        else
          render json: { success: false, errors: geo_point.errors.message }.to_json
        end
      end

      def destroy
        if geo_point.destroy
          render json: { success: true }.to_json
        else
          render json: { success: false, errors: geo_point.errors.message }.to_json
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
        return nil unless params.fetch(:geo_point, false)

        params.require(:geo_point).permit(:width, :height, :rad_value)
      end
    end
  end
end
