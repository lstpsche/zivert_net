# frozen_string_literal: true

class MeasurementBase < ApplicationRecord
  self.table_name = 'measurements'

  validates :longitude, :latitude, presence: true

  belongs_to :user

  before_create :assign_values_in_units
  after_create :broadcast_creation
  after_update :broadcast_updation
  after_destroy :broadcast_deletion

  private

  def assign_values_in_units
    assign_attributes(MeasurementUnitsCounterService.new(self).count_values)
  end
end
