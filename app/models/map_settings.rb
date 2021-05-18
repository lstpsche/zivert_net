# frozen_string_literal: true

class MapSettings < ApplicationRecord
  OPTIONS = {
    units: %w[urh ush]
  }.freeze

  belongs_to :user

  enum units: { urh: 'urh', ush: 'ush' }

  before_create :assign_defaults

  def self.defaults
    YAML.load_file("#{Rails.root}/config/defaults/map_settings.yml")
  end

  private

  def assign_defaults
    assign_attributes(self.class.defaults.merge(attributes.compact))
  end
end
