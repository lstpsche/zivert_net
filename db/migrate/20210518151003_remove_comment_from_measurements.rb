class RemoveCommentFromMeasurements < ActiveRecord::Migration[5.2]
  def change
    remove_column :measurements, :comment
  end
end
