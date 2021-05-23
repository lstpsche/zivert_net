class RemoveCommentFieldForGeoPoints < ActiveRecord::Migration[5.2]
  def change
    remove_column :geo_points, :comment
  end
end
