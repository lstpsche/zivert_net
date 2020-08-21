# frozen_string_literal: true

module Measurements
  class DeletionChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'measurements_deletion_channel'
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  end
end
