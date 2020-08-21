# frozen_string_literal: true

module GeoPoints
  class UpdationChannel < ApplicationCable::Channel
    def subscribed
      stream_from 'geo_points_updation_channel'
    end

    def unsubscribed
      # Any cleanup needed when channel is unsubscribed
    end
  end
end
