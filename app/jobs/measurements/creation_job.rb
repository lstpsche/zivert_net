# frozen_string_literal: true

module Measurements
  class CreationJob < ApplicationJob
    queue_as :urgent

    def perform(measurement)
      MeasurementsCore::GeoPointValueCalculationService.new(measurement.geo_point).calculate

      ActionCable.server.broadcast('measurements_creation_channel', measurement: measurement.json)
    end
  end
end
