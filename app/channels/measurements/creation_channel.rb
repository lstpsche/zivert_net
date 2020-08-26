# frozen_string_literal: true

module Measurements
  class CreationChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'measurements_creation_channel'
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  end
end
