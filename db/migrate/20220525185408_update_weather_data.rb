class UpdateWeatherData < ActiveRecord::Migration[5.2]
  def change
    change_table :weather_data do |t|
      t.remove :cloudness
      t.remove :precipitation_strength
      t.remove :precipitation_type
      t.remove :is_thunder

      t.integer :wind_direction_deg
    end
  end
end
