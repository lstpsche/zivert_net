# frozen_string_literal: true

module Measurements
  class BaseJob < ApplicationJob
    def perform(action, measurement)
      ActionCable.server.broadcast('measurements_channel', action: action, measurement: measurement.json)
    end
  end
end
