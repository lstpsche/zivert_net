# frozen_string_literal: true

FactoryBot.define do
  factory StaticMeasurement do
    sequence(:value_urh) { rand(100) }
    sequence(:value_ush) { rand(100) }
    sequence(:latitude) { rand(100) }
    sequence(:longitude) { rand(100) }
    sequence(:is_static) { true }
    sequence(:station_name) { |i| "station_#{i}" }
    association :user
  end
end
