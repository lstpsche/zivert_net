class ChangeWeatherDataFieldsType < ActiveRecord::Migration[5.2]
  def change
    change_table :weather_data do |t|
      t.change :temperature, :float
      t.change :wind_speed, :float
      t.change :pressure_mm, :float
      t.change :pressure_pa, :float
    end
  end
end
