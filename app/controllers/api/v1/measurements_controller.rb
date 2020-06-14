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

      private

      def measurement
        @measurement ||= Measurement.find(params[:id])
      end
    end
  end
end
