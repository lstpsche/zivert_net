# frozen_string_literal: true

module Api
  module V1
    module DeviseCustom
      class RegistrationsController < Devise::RegistrationsController
        private

        def after_update_path_for(_resource)
          home_path
        end
      end
    end
  end
end
