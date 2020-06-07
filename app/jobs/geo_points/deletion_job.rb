# frozen_string_literal: true

module GeoPoints
  class DeletionJob < ApplicationJob
    queue_as :urgent

    def perform(geo_point)
      ActionCable.server.broadcast('geo_points_deletion_channel', geoPoint: geo_point.json)
    end
  end
end
