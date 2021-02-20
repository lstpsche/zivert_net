# frozen_string_literal: true

module Users
  class CreationJob < BaseJob
    def perform(user)
      super('create', user)
    end
  end
end
