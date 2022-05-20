# frozen_string_literal: true

class MapSettings < ApplicationRecord
  OPTIONS = {
    base_map: %w[regularMap],
    overlay_layers: %w[dimmer measurements heatmap hexagons],
    units: %w[urh ush]
  }.freeze

  belongs_to :user

  enum units: { urh: 'urh', ush: 'ush' }

  before_create :assign_defaults

  def self.defaults
    YAML.load_file("#{Rails.root}/config/defaults/map_settings.yml")
  end

  # { field_name: { fieldOption: { selected: true/false } } }
  def update_settings(settings_params)
    attrs = {
      base_map: settings_params[:base_map].select { |_, val| val[:selected] }.keys.first,
      overlay_layers: settings_params[:overlay_layers].select { |_, val| val[:selected] }.keys,
      units: settings_params[:units]
    }

    update(attrs)
  end

  private

  def assign_defaults
    assign_attributes(self.class.defaults.merge(attributes.compact))
  end
end
