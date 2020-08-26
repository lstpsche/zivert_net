class ChangeNameAndTypesOfGeoPointsFields < ActiveRecord::Migration[5.2]
  def change
    remove_column :geo_points, :width
    remove_column :geo_points, :height

    add_column :geo_points, :latitude, :float, default: 0.0, null: false
    add_column :geo_points, :longitude, :float, default: 0.0, null: false
  end
end
