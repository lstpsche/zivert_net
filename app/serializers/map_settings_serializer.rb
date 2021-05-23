# frozen_string_literal: true

class MapSettingsSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :user_id, :units
end
