# frozen_string_literal: true

class GeoPoint < ApplicationRecord
  validates :latitude, :latitude, :rad_value, presence: true
end
