# frozen_string_literal: true

class MeasurementSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :user_id, :geo_point_id, :value, :comment
end
