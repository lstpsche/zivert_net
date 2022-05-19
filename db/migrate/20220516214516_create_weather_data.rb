class CreateWeatherData < ActiveRecord::Migration[5.2]
  def change
    create_table :weather_data do |t|
      t.integer :temperature
      t.integer :pressure_mm
      t.integer :pressure_pa
      t.integer :cloudness
      t.integer :precipitation_type
      t.integer :precipitation_strength
      t.integer :wind_speed
      t.integer :humidity

      t.string :condition
      t.string :wind_direction

      t.boolean :is_thunder

      t.belongs_to :static_measurement

      t.timestamps
    end
  end
end
