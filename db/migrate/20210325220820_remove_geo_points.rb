class RemoveGeoPoints < ActiveRecord::Migration[5.2]
  def up
    add_column :measurements, :latitude, :float, default: 0.0, null: false
    add_column :measurements, :longitude, :float, default: 0.0, null: false

    execute <<~SQL
      UPDATE measurements
      SET latitude = GeoPoints.latitude, longitude = GeoPoints.longitude
      FROM (SELECT id, latitude, longitude FROM geo_points) AS GeoPoints
      WHERE GeoPoints.id = measurements.geo_point_id
    SQL

    drop_table :geo_points
    remove_column :measurements, :geo_point_id
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
