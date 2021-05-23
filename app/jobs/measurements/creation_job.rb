# frozen_string_literal: true

module Measurements
  class CreationJob < BaseJob
    def perform(measurement)
      super('create', measurement)
    end
  end
end
