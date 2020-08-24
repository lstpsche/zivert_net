# frozen_string_literal: true

module Api
  module V1
    class MeasurementsController < ApplicationController
      before_action :authenticate_user!, except: %i[index show]

      def index
        measurements = Measurement.all.map(&:json)

        render json: { measurements: measurements }.to_json
      end

      def show
        render json: { measurement: measurement.json }.to_json
      end

      def create
        render_json_response(success: build_measurement.save)
      end

      def destroy
        render_json_response(success: measurement.destroy)
      end

      private

      def render_json_response(success:)
        render json: { success: success, errors: measurement.errors&.messages }.to_json
      end

      def measurement
        @measurement ||= Measurement.find(params[:id])
      end

      def build_measurement
        @measurement = current_user.measurements.build(measurement_params)
      end

      def measurement_params
        return nil unless params.fetch(:measurement, false)

        params.require(:measurement).permit(:geo_point_id, :value, :comment)
      end
    end
  end
end
