# frozen_string_literal: true

class GeoPoint < ApplicationRecord
  validates :width, :height, presence: true
end
