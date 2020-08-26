# frozen_string_literal: true

module Api
  module V1
    class CurrentUserController < Api::V1::ApplicationController
      def index
        if current_user.present?
          render json: { signed_in: true, user: current_user.json }.to_json
        else
          render json: { signed_in: false }.to_json
        end
      end
    end
  end
end
