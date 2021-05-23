class AddSeparateUnitsValuesForMeasurements < ActiveRecord::Migration[5.2]
  def up
    add_column :measurements, :value_urh, :float
    add_column :measurements, :value_ush, :float

    assign_value_to_urh_and_ush

    remove_column :measurements, :value
  end

  def down
    add_column :measurements, :value, :float

    assign_urh_to_value

    remove_column :measurements, :value_urh
    remove_column :measurements, :value_ush
  end

  private

  class MeasurementTemp < ActiveRecord::Base
    self.table_name = 'measurements'
  end

  def assign_value_to_urh_and_ush
    execute <<-SQL
      UPDATE measurements m SET value_urh = m.value, value_ush = m.value*0.01
    SQL
  end

  def assign_urh_to_value
    execute <<-SQL
      UPDATE measurements m SET value = m.value_urh
    SQL
  end
end
