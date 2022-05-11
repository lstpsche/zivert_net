class AddNameFieldForStaticMeasurements < ActiveRecord::Migration[5.2]
  def change
    add_column :measurements, :station_name, :string, default: nil
  end
end
