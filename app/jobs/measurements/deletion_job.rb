# frozen_string_literal: true

module Measurements
  class DeletionJob < ApplicationJob
    queue_as :urgent

    def perform(measurement)
      ActionCable.server.broadcast('measurements_deletion_channel', measurement: measurement.json)
    end
  end
end
