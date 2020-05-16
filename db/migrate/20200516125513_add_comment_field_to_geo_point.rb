class AddCommentFieldToGeoPoint < ActiveRecord::Migration[5.2]
  def change
    add_column :geo_points, :comment, :string, default: '', null: false
  end
end
