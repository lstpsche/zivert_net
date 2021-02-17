# frozen_string_literal: true

module GeoPoints
  class CreationJob < BaseJob
    def perform(geo_point)
      super('create', geo_point)
    end
  end
end
