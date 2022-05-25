# frozen_string_literal: true

class WeatherDataSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :temperature, :pressure_mm, :pressure_pa, :wind_speed, :humidity, :condition,
             :wind_direction, :wind_direction_deg, :static_measurement_id, :created_at
end
