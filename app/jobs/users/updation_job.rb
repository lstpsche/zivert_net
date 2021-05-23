# frozen_string_literal: true

module Users
  class UpdationJob < Users::BaseJob
    def perform(user)
      super('update', user)
    end
  end
end
