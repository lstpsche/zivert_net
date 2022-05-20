# frozen_string_literal: true

module Api
  module V1
    class MapSettingsController < Api::V1::ApplicationController
      before_action :check_current_user, only: :update

      def index
        render json: {
          map_settings: user_map_settings,
          map_settings_options: MapSettings::OPTIONS
        }.to_json
      end

      def update
        render_json_response(success: map_settings.update_settings(map_settings_params))
      end

      private

      def user_map_settings
        return { data: { attributes: MapSettings.defaults } } if current_user.blank?

        current_user.map_settings.json
      end

      def map_settings
        @map_settings ||= MapSettings.find(params[:id])
      end

      def render_json_response(success:)
        render json: { success: success, errors: map_settings.errors&.messages }.to_json
      end

      def check_current_user
        render json: {} if current_user.blank?
      end

      def map_settings_params
        params.require(:map_settings).permit(
          :units,
          :overlay_layers,
          base_map: [
            regularMap: [:selected]
          ],
          overlay_layers: [
            dimmer: [:selected],
            measurements: [:selected],
            heatmap: [:selected],
            hexagons: [:selected]
          ]
        )
      end
    end
  end
end
