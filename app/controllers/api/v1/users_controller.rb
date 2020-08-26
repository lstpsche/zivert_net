# frozen_string_literal: true

module Api
  module V1
    class UsersController < Api::V1::ApplicationController
      before_action :authenticate_user!, except: %i[index]

      def index
        users = User.all.map(&:json)

        render json: { users: users }.to_json
      end
    end
  end
end
