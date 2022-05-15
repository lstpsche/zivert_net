# frozen_string_literal: true

module StaticMeasurements
  class UpdationJob < BaseJob
    def perform(static_measurement)
      super('update', static_measurement)
    end
  end
end
