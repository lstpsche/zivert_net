# frozen_string_literal: true

class GeoPointSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :user_id, :longitude, :latitude, :rad_value, :comment
end
