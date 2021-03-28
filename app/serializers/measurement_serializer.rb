# frozen_string_literal: true

class MeasurementSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :latitude, :longitude, :value, :comment, :user_id
end
