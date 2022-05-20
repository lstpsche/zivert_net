# frozen_string_literal: true

class MapSettingsSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :user_id, :base_map, :overlay_layers, :units
end
