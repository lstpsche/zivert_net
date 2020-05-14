# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:id) { |i| i }
    sequence(:username) { |i| "username_#{i}" }
    sequence(:first_name) { |i| "User #{i} first name" }
    sequence(:last_name) { |i| "User #{i} last name" }
  end
end
