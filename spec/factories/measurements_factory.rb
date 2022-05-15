# frozen_string_literal: true

FactoryBot.define do
  factory Measurement do
    sequence(:value_urh) { rand(100) }
    sequence(:value_ush) { rand(100) }
    sequence(:latitude) { rand(100) }
    sequence(:longitude) { rand(100) }
    sequence(:is_static) { false }
    sequence(:station_name) { nil }
    association :user
  end
end
