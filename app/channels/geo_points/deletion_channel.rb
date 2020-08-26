# frozen_string_literal: true

module GeoPoints
  class DeletionChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'geo_points_deletion_channel'
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  end
end
