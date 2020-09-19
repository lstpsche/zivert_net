# frozen_string_literal: true

module Api
  module V1
    module DeviseCustom
      class RegistrationsController < Devise::RegistrationsController
        respond_to :json

        rescue_from Authentication::PasswordNotValid, with: :render_password_not_valid
        rescue_from Authentication::UsernameNotUnique, with: :render_username_not_unique

        before_action :verify_password!, only: :update
        before_action :check_username_uniqueness!, only: %i[create update]
        before_action :configure_permitted_parameters

        private

        def verify_password!
          password = params[:registration][:user][:current_password]
          return true if current_user.valid_password?(password)

          raise Authentication::PasswordNotValid
        end

        def check_username_uniqueness!
          params_username = params[:user][:username]
          return true if current_user.username == params_username || User.username_unique?(params_username)

          raise Authentication::UsernameNotUnique
        end

        def render_password_not_valid
          render json: { error: I18n.t('errors.password_not_valid') }
        end

        def render_username_not_unique
          render json: { error: I18n.t('errors.username_not_unique') }
        end

        def configure_permitted_parameters
          devise_parameter_sanitizer.permit(:sign_up, keys: %i[first_name last_name username nickname])
          devise_parameter_sanitizer.permit(:account_update, keys: %i[first_name last_name username])
        end

        # needed to render json as response
        def respond_with(resource, _opt = {})
          render json: { user: resource.json }.to_json
        end
      end
    end
  end
end
