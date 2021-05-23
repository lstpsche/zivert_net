# frozen_string_literal: true

module Users
  class BaseJob < ApplicationJob
    def perform(action, user)
      ActionCable.server.broadcast('users_channel', action: action, user: user.json)
    end
  end
end
