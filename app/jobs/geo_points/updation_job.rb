# frozen_string_literal: true

module GeoPoints
  class UpdationJob < BaseJob
    def perform(geo_point)
      super('update', geo_point)
    end
  end
end
