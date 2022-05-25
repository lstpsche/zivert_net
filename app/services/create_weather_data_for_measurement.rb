# frozen_string_literal: true

# creates WeatherData entity for given measurement
class CreateWeatherDataForMeasurement
  attr_reader :static_measurement

  def initialize(static_measurement)
    @static_measurement = static_measurement
  end

  def execute
    weather_json = FetchOpenWeatherData.new.execute(
      lat: static_measurement.latitude,
      long: static_measurement.longitude
    )

    WeatherData.create(
      **weather_json,
      static_measurement: static_measurement
    )
  end
end
