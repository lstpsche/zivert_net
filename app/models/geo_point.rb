# frozen_string_literal: true

class GeoPoint < ApplicationRecord
  validates :latitude, :latitude, :rad_value, presence: true

  belongs_to :user
  has_many :measurements, dependent: :destroy

  after_create :broadcast_creation, :create_initial_measurement
  after_update :broadcast_updation
  after_destroy :broadcast_deletion

  def json
    GeoPointSerializer.new(self).serializable_hash
  end

  private

  def create_initial_measurement
    Measurement.create_initial(geo_point: self)
  end

  def broadcast_creation
    GeoPoints::CreationJob.perform_now(self)
  end

  def broadcast_updation
    GeoPoints::UpdationJob.perform_now(self)
  end

  def broadcast_deletion
    GeoPoints::DeletionJob.perform_now(self)
  end
end
