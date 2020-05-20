# frozen_string_literal: true

class GeoPoint < ApplicationRecord
  validates :latitude, :latitude, :rad_value, presence: true

  belongs_to :user

  def json
    GeoPointSerializer.new(self).serializable_hash
  end
end
