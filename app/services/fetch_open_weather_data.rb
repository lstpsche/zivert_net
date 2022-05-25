# frozen_string_literal: true

# fetches Yandex API weather data and parses it to hash
class FetchOpenWeatherData
  OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'

  WEATHER_DATA_FIELD_DIG = {
    temperature: %w[main temp],
    pressure_pa: %w[main pressure],
    condition: ['weather', 0, 'main'],
    wind_speed: %w[wind speed],
    wind_direction_deg: %w[wind deg],
    humidity: %w[main humidity]
  }.freeze

  WIND_DIR_DEG_MAP = {
    'n' => [337.5, 22.5],
    'ne' => [22.5, 67.5],
    'e' => [67.5, 112.5],
    'se' => [112.5, 157.5],
    's' => [157.5, 202.5],
    'sw' => [202.5, 247.5],
    'w' => [247.5, 292.5],
    'nw' => [292.5, 337.5]
  }.freeze

  def execute(lat:, long:)
    weather_json = weather_json(lat, long)
    parsed_weather = parse_weather_json(weather_json)

    append_countable_fields(parsed_weather)
  end

  private

  def weather_json(lat, long)
    uri = URI(OPEN_WEATHER_API_URL)
    uri.query = URI.encode_www_form(request_params(lat, long))
    response = Net::HTTP.get_response(uri)

    JSON.parse(response.body)
  end

  def parse_weather_json(weather_json)
    WEATHER_DATA_FIELD_DIG.transform_values do |dig_path|
      weather_json.dig(*dig_path)
    end
  end

  def append_countable_fields(weather_json)
    weather_json.merge(
      wind_direction: count_wind_direction(weather_json[:wind_direction_deg]),
      pressure_mm: convert_pa_to_mmhg(weather_json[:pressure_pa])
    )
  end

  def count_wind_direction(wind_direction_deg)
    WIND_DIR_DEG_MAP.select do |_dir, deg_range|
      wind_direction_deg > deg_range.first && wind_direction_deg <= deg_range.last
    end.first&.first
  end

  def convert_pa_to_mmhg(pressure_pa)
    0.750061683 * pressure_pa
  end

  def request_params(lat, long)
    {
      lat: lat,
      lon: long,
      units: 'metric',
      exclude: 'minutely,hourly,daily,alerts',
      appid: ENV['OPEN_WEATHER_API_KEY']
    }
  end
end
