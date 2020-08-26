# frozen_string_literal: true

FactoryBot.define do
  factory :geo_point do
    sequence(:rad_value) { |i| 10 + i }
    sequence(:latitude) { rand(100) }
    sequence(:longitude) { rand(100) }
    association :user
  end
end
