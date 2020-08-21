# frozen_string_literal: true

class Measurement < ApplicationRecord
  belongs_to :user
  belongs_to :geo_point

  after_create ->(measurement) { Measurements::CreationJob.perform_now(measurement) }
  after_update ->(measurement) { Measurements::UpdationJob.perform_now(measurement) }
  ## TODO: investigate why on destroing of measurement, geoPoint always deletes
  before_destroy ->(measurement) { binding.pry; measurement.geo_point.destroy if geo_point.measurements.empty? }
  after_destroy ->(measurement) { Measurements::DeletionJob.perform_now(measurement) }

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
end
