# frozen_string_literal: true

module Api
  module V1
    class WeatherDataController < ApplicationController
      def index
        # using .all bc we need all measurements for periods
        all_weather_data = WeatherData.all.map(&:json)

        render json: { weatherData: all_weather_data }.to_json
      end
    end
  end
end
