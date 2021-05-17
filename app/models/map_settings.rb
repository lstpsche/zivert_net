# frozen_string_literal: true

class MapSettings < ApplicationRecord
  belongs_to :user

  enum units: { urh: 'urh', ush: 'ush' }

  before_create :assign_defaults

  private

  def assign_defaults
    defaults = YAML.load_file("#{Rails.root}/config/defaults/map_settings.yml")

    assign_attributes(defaults.merge(attributes.compact))
  end
end
