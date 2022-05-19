# frozen_string_literal: true

class WeatherData < ApplicationRecord
  belongs_to :static_measurement
end
