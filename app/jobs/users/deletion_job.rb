# frozen_string_literal: true

module Users
  class DeletionJob < BaseJob
    def perform(user)
      super('delete', user)
    end
  end
end
