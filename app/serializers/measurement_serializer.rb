# frozen_string_literal: true

class MeasurementSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :latitude, :longitude, :value_urh, :value_ush, :user_id, :created_at
end
