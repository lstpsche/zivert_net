# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:id) { |i| i }
    sequence(:username) { |i| "name_#{i}" }
    sequence(:nickname) { |i| "Name_#{i}" }
    sequence(:password) { |i| "password_#{i}" }
    sequence(:password_confirmation) { |i| "password_#{i}" }
    sequence(:first_name) { |i| "User #{i} first name" }
    sequence(:last_name) { |i| "User #{i} last name" }
    admin { false }
  end
end
