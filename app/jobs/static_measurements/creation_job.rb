# frozen_string_literal: true

module StaticMeasurements
  class CreationJob < BaseJob
    def perform(static_measurement)
      super('create', static_measurement)
    end
  end
end
