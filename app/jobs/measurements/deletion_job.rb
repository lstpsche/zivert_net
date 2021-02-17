# frozen_string_literal: true

module Measurements
  class DeletionJob < BaseJob
    def perform(measurement)
      super('delete', measurement)
    end
  end
end
