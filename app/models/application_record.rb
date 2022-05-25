# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def json
    "#{class_name}Serializer".safe_constantize&.new(self)&.serializable_hash
  end

  def broadcast_creation
    "#{class_name.pluralize}::CreationJob".safe_constantize&.perform_now(self)
  end

  def broadcast_updation
    "#{class_name.pluralize}::UpdationJob".safe_constantize&.perform_now(self)
  end

  def broadcast_deletion
    "#{class_name.pluralize}::DeletionJob".safe_constantize&.perform_now(self)
  end

  def class_name
    self.class.name
  end
end
