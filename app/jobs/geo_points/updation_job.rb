# frozen_string_literal: true

module GeoPoints
  class UpdationJob < ApplicationJob
    queue_as :urgent

    def perform(geo_point)
      ActionCable.server.broadcast('geo_points_updation_channel', geoPoint: geo_point.json)
    end
  end
end
