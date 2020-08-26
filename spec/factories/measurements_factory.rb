# frozen_string_literal: true

FactoryBot.define do
  factory :measurement do
    sequence(:value) { rand(100) }
    association :user
    association :geo_point
  end
end
