# frozen_string_literal: true

module MeasurementsCore
  class GeoPointValueCalculationService
    def initialize(geo_point)
      @geo_point = geo_point
      @measurements = geo_point.measurements
    end

    def calculate
      @geo_point.update(rad_value: calculate_new_value(@measurements.map(&:value)))
    end

    private

    def calculate_new_value(measurements_values)
      # For now we will calculate only the mean average of all values
      # We will implement more complex algorithm later
      measurements_values.sum(0.0) / measurements_values.size
    end
  end
end
