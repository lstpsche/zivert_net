# frozen_string_literal: true

class Measurement < ApplicationRecord
  belongs_to :user
  belongs_to :geo_point, dependent: :destroy

  after_create ->(measurement) { Measurements::CreationJob.perform_now(measurement) }
  after_update ->(measurement) { Measurements::UpdationJob.perform_now(measurement) }
  after_destroy(
    lambda do |measurement|
      Measurements::DeletionJob.perform_now(measurement)
      measurement.geo_point.destroy if geo_point.measurements.empty?
    end
  )

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
