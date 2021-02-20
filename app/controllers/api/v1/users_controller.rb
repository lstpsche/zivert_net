# frozen_string_literal: true

module Api
  module V1
    class UsersController < Api::V1::ApplicationController
      def index
        users = User.all.map(&:json)

        render json: { users: users }.to_json
      end
    end
  end
end
