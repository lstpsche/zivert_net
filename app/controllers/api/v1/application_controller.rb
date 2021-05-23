# frozen_string_literal: true

module Api
  module V1
    class ApplicationController < ::ApplicationController
      protect_from_forgery with: :null_session
      respond_to :json

      rescue_from Authentication::NotPermitted, with: :render_not_permitted
      rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

      private

      def record_not_found
        render json: { error: I18n.t('errors.record_not_found') }, status: :bad_request
      end

      def render_not_permitted
        render json: { error: I18n.t('errors.not_permitted') }, status: :bad_request
      end
    end
  end
end
