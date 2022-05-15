# frozen_string_literal: true

class StaticMeasurementSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :latitude, :longitude, :value_urh, :value_ush, :is_static, :station_name, :user_id, :created_at
end
