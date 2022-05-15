# frozen_string_literal: true

module Api
  module V1
    class StaticMeasurementsController < ApplicationController
      def index
        # using .all bc we need all measurements for periods
        static_measurements = StaticMeasurement.all.map(&:json)

        render json: { staticMeasurements: static_measurements }.to_json
      end
    end
  end
end
