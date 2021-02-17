# frozen_string_literal: true

module Measurements
  class UpdationJob < BaseJob
    def perform(measurement)
      super('update', measurement)
    end
  end
end
