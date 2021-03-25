# frozen_string_literal: true

class Measurement < ApplicationRecord
  belongs_to :user
  belongs_to :geo_point

  after_create :broadcast_creation
  after_update :broadcast_updation
  after_destroy :delete_geo_point

  class << self
    def create_initial(geo_point:)
      create(
        geo_point: geo_point,
        user_id: geo_point.user_id,
        value: geo_point.rad_value
      )
    end
  end

  private

  def delete_geo_point
    if geo_point.measurements.empty?
      geo_point.destroy
    else
      broadcast_deletion
    end
  end
end
