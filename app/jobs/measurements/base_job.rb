# frozen_string_literal: true

module Measurements
  class BaseJob < ApplicationJob
    queue_as :urgent

    def perform(action, measurement)
      MeasurementsCore::GeoPointValueCalculationService.new(measurement.geo_point).calculate

      ActionCable.server.broadcast('measurements_channel', action: action, measurement: measurement.json)
    end
  end
end
