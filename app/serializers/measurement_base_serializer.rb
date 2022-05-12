# frozen_string_literal: true

class MeasurementBaseSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :latitude, :longitude, :value_urh, :value_ush, :static, :station_name, :user_id, :created_at
end
