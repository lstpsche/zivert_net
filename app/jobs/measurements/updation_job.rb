# frozen_string_literal: true

module Measurements
  class UpdationJob < ApplicationJob
    queue_as :urgent

    def perform(measurement)
      ActionCable.server.broadcast('measurements_updation_channel', measurement: measurement.json)
    end
  end
end
