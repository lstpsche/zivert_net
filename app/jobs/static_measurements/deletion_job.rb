# frozen_string_literal: true

module StaticMeasurements
  class DeletionJob < BaseJob
    def perform(static_measurement)
      super('delete', static_measurement)
    end
  end
end
