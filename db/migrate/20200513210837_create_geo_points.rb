class CreateGeoPoints < ActiveRecord::Migration[5.2]
  def change
    create_table :geo_points do |t|
      t.integer :width, default: 0, null: false
      t.integer :height, default: 0, null: false

      t.timestamps
    end
  end
end
