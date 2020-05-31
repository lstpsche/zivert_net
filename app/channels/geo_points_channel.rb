# frozen_string_literal: true

class GeoPointsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'geo_points_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
