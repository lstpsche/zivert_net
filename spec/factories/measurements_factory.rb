# frozen_string_literal: true

FactoryBot.define do
  factory :measurement do
    sequence(:id) { |i| i }
    sequence(:value) { rand(100) }
    # sequence(:user) { create(:user) }
    association :user
    association :geo_point
    # sequence(:geo_point) { create(:geo_point) }
  end
end
