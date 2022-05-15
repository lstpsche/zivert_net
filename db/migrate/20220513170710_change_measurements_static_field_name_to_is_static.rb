class ChangeMeasurementsStaticFieldNameToIsStatic < ActiveRecord::Migration[5.2]
  def change
    rename_column :measurements, :static, :is_static
  end
end
