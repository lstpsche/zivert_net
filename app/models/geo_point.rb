# frozen_string_literal: true

class GeoPoint < ApplicationRecord
  validates :latitude, :latitude, :rad_value, presence: true

  belongs_to :user
  has_many :measurements, dependent: :destroy

  after_create :broadcast_creation, :create_initial_measurement
  after_update ->(geo_point) { GeoPoints::UpdationJob.perform_now(geo_point) }
  after_destroy ->(geo_point) { GeoPoints::DeletionJob.perform_now(geo_point) }

  def json
    GeoPointSerializer.new(self).serializable_hash
  end

  private

  def broadcast_creation
    GeoPoints::CreationJob.perform_now(self)
  end

  def create_initial_measurement
    Measurement.create_initial(geo_point: self)
  end
end
