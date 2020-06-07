# frozen_string_literal: true

class GeoPoint < ApplicationRecord
  validates :latitude, :latitude, :rad_value, presence: true

  belongs_to :user
  has_many :measurements

  after_create ->(geo_point) { GeoPoints::CreationJob.perform_now(geo_point) }
  after_update ->(geo_point) { GeoPoints::UpdationJob.perform_now(geo_point) }
  after_destroy ->(geo_point) { GeoPoints::DeletionJob.perform_now(geo_point) }

  def json
    GeoPointSerializer.new(self).serializable_hash
  end
end
