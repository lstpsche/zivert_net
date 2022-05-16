# frozen_string_literal: true

# fetches Yandex API weather data and parses it to hash
class FetchYandexWeatherData
  YANDEX_API_URL = 'https://api.weather.yandex.ru/v2/forecast'

  REJECTED_ATTRIBUTES = [
    'now',
    'now_dt',
    'geo_object',
    'yesterday',
    'forecasts',
    { 'info' => %w[n geoid url tzinfo slug zoom nr ns nsr p f _h def_pressure_mm def_pressure_pa] },
    { 'fact' => %w[obs_time uptime feels_like icon daytime polar prec_prob
                   season source soil_moisture soil_temp uv_index wind_gust] }
  ].freeze

  def execute(lat, long)
    weather_json = weather_json(lat, long)
    clean_up_json(weather_json)
  end

  private

  def weather_json(lat, long)
    response = RestClient::Request.execute(
      method: :get,
      url: YANDEX_API_URL,
      payload: request_params(lat, long),
      headers: request_headers
    )

    JSON.parse(response.body)
  end

  def clean_up_json(json)
    REJECTED_ATTRIBUTES.each do |rej_attr|
      if rej_attr.is_a?(Hash)
        json_key = rej_attr.keys.first

        json[json_key] = json[json_key].except(*rej_attr.values.first)
      else
        json.delete(rej_attr)
      end
    end

    json
  end

  def request_params(lat, long)
    {
      lat: lat,
      long: long
    }
  end

  def request_headers
    {
      'X-Yandex-API-Key' => ENV['YANDEX_API_KEY']
    }
  end
end
