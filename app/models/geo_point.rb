# frozen_string_literal: true

class GeoPoint < ApplicationRecord
  validates :width, :height, :rad_value, presence: true
end
