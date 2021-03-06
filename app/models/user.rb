# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable

  has_many :measurements
  has_one :map_settings, dependent: :destroy

  after_create :create_map_settings, :broadcast_creation
  after_update :broadcast_updation
  after_destroy :broadcast_deletion

  class << self
    def username_unique?(username)
      where(username: username.downcase).empty?
    end
  end

  # it's needed to escape devise's depending on emails
  def email_changed?
    false
  end
end
