# frozen_string_literal: true

module GeoPoints
  class BaseJob < ApplicationJob
    queue_as :urgent

    def perform(action, geo_point)
      ActionCable.server.broadcast('geo_points_channel', action: action, geoPoint: geo_point.json)
    end
  end
end
