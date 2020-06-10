# frozen_string_literal: true

class Measurement < ApplicationRecord
  belongs_to :user
  belongs_to :geo_point

  def json
    MeasurementSerializer.new(self).serializable_hash
  end

  class << self
    def create_initial(geo_point:)
      create(
        geo_point: geo_point,
        user_id: geo_point.user_id,
        value: geo_point.rad_value
      )
    end
  end
end
