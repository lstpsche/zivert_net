# frozen_string_literal: true

module GeoPoints
  class DeletionJob < BaseJob
    def perform(geo_point)
      super('delete', geo_point)
    end
  end
end
