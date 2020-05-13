class CreateGeoPoints < ActiveRecord::Migration[5.2]
  def change
    create_table :geo_points do |t|
      t.integer :width
      t.integer :height

      t.timestamps
    end
  end
end
