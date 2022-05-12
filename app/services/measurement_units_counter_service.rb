# frozen_string_literal: true

class MeasurementUnitsCounterService
  # for now main units are uR/h
  UNITS_COEFS = {
    'value_urh' => 1,
    'value_ush' => 100
  }.freeze

  def initialize(measurement)
    @measurement = measurement
  end

  def count_values
    median = filled_value.last * UNITS_COEFS.fetch(filled_value.first)

    UNITS_COEFS.transform_values { |coef| median / coef }
  end

  private

  # ex. ['value_ush', 12]
  def filled_value
    @filled_value ||= @measurement.attributes.slice(*UNITS_COEFS.keys).compact.first
  end
end
