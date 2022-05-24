# frozen_string_literal: true

class WeatherDataSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :temperature, :pressure_mm, :pressure_pa, :cloudness, :precipitation_type, :precipitation_strength,
             :wind_speed, :humidity, :condition, :wind_direction, :is_thunder, :static_measurement_id, :created_at
end
