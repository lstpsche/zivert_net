# frozen_string_literal: true

class User < ApplicationRecord
  # :confirmable, :lockable, :timeoutable, and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable

  has_many :geo_points
  has_many :measurements

  # it's needed to escape devise's extreme depending on emails
  def email_changed?
    false
  end

  def json
    UserSerializer.new(self).serializable_hash
  end

  class << self
    def username_unique?(username)
      where(username: username).empty?
    end
  end
end
