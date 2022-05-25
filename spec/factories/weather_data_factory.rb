# frozen_string_literal: true

FactoryBot.define do
  factory WeatherData do
    sequence(:temperature) { rand(100) }
    sequence(:pressure_mm) { rand(100) }
    sequence(:pressure_pa) { rand(100) }
    sequence(:wind_speed) { rand(100) }
    sequence(:humidity) { rand(100) }
    sequence(:condition) { |i| "condition_#{i}" }
    sequence(:wind_direction) { |i| "wind_dir_#{i}" }
    sequence(:wind_direction_deg) { rand(360) }
    association :static_measurement
  end
end
