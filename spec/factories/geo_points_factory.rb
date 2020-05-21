# frozen_string_literal: true

FactoryBot.define do
  factory :geo_point do
    sequence(:id) { |i| i }
    sequence(:rad_value) { |i| 10 + i }
    sequence(:latitude) { |_i| rand(100) }
    sequence(:longitude) { |_i| rand(100) }
    sequence(:comment) { |i| "comment_#{i}" }
    sequence(:user) { |i| create(:user) }
  end
end
