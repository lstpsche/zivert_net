# frozen_string_literal: true

FactoryBot.define do
  factory :measurement do
    sequence(:id) { |i| i }
    sequence(:value) { |_i| rand(100) }
    sequence(:user) { |_i| create(:user) }
    sequence(:geo_point) { |_i| create(:geo_point) }
  end
end
