# frozen_string_literal: true

module Api
  module V1
    class MapController < Api::V1::ApplicationController
      before_action :authenticate_user!, except: :index

      def index
        # render here geo_points/users/all related to maps info
        geo_points = GeoPoint.all.map(&:json)

        render json: { geoPoints: geo_points }.to_json
      end
    end
  end
end
