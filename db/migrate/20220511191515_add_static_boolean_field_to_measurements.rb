class AddStaticBooleanFieldToMeasurements < ActiveRecord::Migration[5.2]
  def change
    add_column :measurements, :static, :boolean, default: false, null: false
  end
end
