# frozen_string_literal: true

# creates WeatherData entity for given measurement
class CreateWeatherDataForMeasurement
  attr_reader :static_measurement

  JSON_ATTRS_MAP = {
    temp: :temperature,
    condition: :condition,
    cloudness: :cloudness,
    prec_type: :precipitation_type,
    prec_strength: :precipitation_strength,
    is_thunder: :is_thunder,
    wind_speed: :wind_speed,
    wind_dir: :wind_direction,
    pressure_mm: :pressure_mm,
    pressure_pa: :pressure_pa,
    humidity: :humidity
  }.freeze

  def initialize(static_measurement)
    @static_measurement = static_measurement
  end

  def execute
    weather_json = FetchYandexWeatherData.new.execute(
      lat: static_measurement.latitude,
      long: static_measurement.longitude
    )

    WeatherData.create(
      **weather_data_attributes(weather_json),
      static_measurement: static_measurement
    )
  end

  private

  def weather_data_attributes(weather_json)
    weather_json.map do |attr| # [name, value]
      [JSON_ATTRS_MAP[attr.first], attr.last]
    end.to_h
  end
end
