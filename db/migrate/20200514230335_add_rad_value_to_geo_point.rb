class AddRadValueToGeoPoint < ActiveRecord::Migration[5.2]
  def change
    add_column :geo_points, :rad_value, :float, null: false, default: 0
  end
end
