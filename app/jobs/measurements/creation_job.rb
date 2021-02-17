# frozen_string_literal: true

module Measurements
  class CreationJob < BaseJob
    def perform(measurement)
      MeasurementsCore::GeoPointValueCalculationService.new(measurement.geo_point).calculate

      super('create', measurement)
    end
  end
end
