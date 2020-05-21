# frozen_string_literal: true

module Api
  module V1
    module DeviseCustom
      class RegistrationsController < Devise::RegistrationsController
        respond_to :json

        before_action :check_username_uniqueness!, only: :create

        private

        def check_username_uniqueness!
          return true if User.username_unique?(params[:user][:username])

          render json: { error: I18n.t('errors.username_not_unique') }
        end

        # needed to render json as response
        def respond_with(resource, _opt = {})
          render json: { user: resource.json }.to_json
        end
      end
    end
  end
end
