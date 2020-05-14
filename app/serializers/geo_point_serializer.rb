# frozen_string_literal: true

class GeoPointSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :width, :height
end
