class ChangeLatLngTypeForMeasurements < ActiveRecord::Migration[5.2]
  def change
    change_column :measurements, :latitude, :string, null: false
    change_column :measurements, :longitude, :string, null: false
  end
end
