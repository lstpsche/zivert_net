# frozen_string_literal: true

module Measurements
  class UpdationChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'measurements_updation_channel'
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  end
end
