# frozen_string_literal: true

module Api
  module V1
    module DeviseCustom
      class RegistrationsController < Devise::RegistrationsController
        respond_to :json

        private

        # needed to render json as response
        def respond_with(resource, _opt = {})
          render json: { user: resource.json }.to_json
        end
      end
    end
  end
end
