# frozen_string_literal: true

FactoryBot.define do
  factory MapSettings do
    sequence(:units) { 'urh' }
    association :user
  end
end
