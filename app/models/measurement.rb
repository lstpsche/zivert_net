# frozen_string_literal: true

class Measurement < ApplicationRecord
  belongs_to :user
  belongs_to :geo_point

  after_create :broadcast_creation
  after_update :broadcast_updation
  after_destroy :broadcast_deletion, :delete_geo_point

  def json
    MeasurementSerializer.new(self).serializable_hash
  end

  class << self
    def create_initial(geo_point:)
      create(
        geo_point: geo_point,
        user_id: geo_point.user_id,
        value: geo_point.rad_value
      )
    end
  end

  private

  def broadcast_creation
    Measurements::CreationJob.perform_now(self)
  end

  def broadcast_updation
    Measurements::UpdationJob.perform_now(self)
  end

  def broadcast_deletion
    Measurements::DeletionJob.perform_now(self)
  end

  def delete_geo_point
    geo_point.destroy if geo_point.measurements.empty?
  end
end
