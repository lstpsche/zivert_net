# frozen_string_literal: true

module StaticMeasurements
  class BaseJob < ApplicationJob
    def perform(action, static_measurement)
      ActionCable.server.broadcast('static_measurements_channel', action: action, static_measurement: static_measurement.json)
    end
  end
end
