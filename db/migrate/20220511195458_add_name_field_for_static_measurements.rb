class AddNameFieldForStaticMeasurements < ActiveRecord::Migration[5.2]
  def change
    # had to do it because js doesn't work well with "static" name
    add_column :measurements, :station_name, :string, default: nil
  end
end
