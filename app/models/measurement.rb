# frozen_string_literal: true

class Measurement < ApplicationRecord
  validates :longitude, :latitude, :value, presence: true

  belongs_to :user

  after_create :broadcast_creation
  after_update :broadcast_updation
  after_destroy :broadcast_deletion
end
