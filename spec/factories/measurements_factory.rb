# frozen_string_literal: true

FactoryBot.define do
  factory :measurement do
    sequence(:value) { rand(100) }
    sequence(:latitude) { rand(100) }
    sequence(:longitude) { rand(100) }
    association :user
  end
end
