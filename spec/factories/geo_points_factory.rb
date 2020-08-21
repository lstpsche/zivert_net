# frozen_string_literal: true

FactoryBot.define do
  factory :geo_point do
    sequence(:id) { |i| i }
    sequence(:rad_value) { |i| 10 + i }
    sequence(:latitude) { rand(100) }
    sequence(:longitude) { rand(100) }
    sequence(:comment) { |i| "comment_#{i}" }
    # sequence(:user) { create(:user) }
    association :user
    association :measurement
    # sequence(:measurements) { |i| [create(:measurement, geo_point_id: i), create(:measurement, geo_point_id: i)] }
  end
end
