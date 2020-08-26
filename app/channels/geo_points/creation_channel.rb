# frozen_string_literal: true

module GeoPoints
  class CreationChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'geo_points_creation_channel'
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  end
end
