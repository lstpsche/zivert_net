# frozen_string_literal: true

FactoryBot.define do
  factory :map_settings do
    sequence(:units) { 'urh' }
    association :user
  end
end
