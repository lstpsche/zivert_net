# frozen_string_literal: true

# fetches Yandex API weather data and parses it to hash
class FetchYandexWeatherData
  YANDEX_API_URL = 'https://api.weather.yandex.ru/v2/forecast'

  REJECTED_ATTRIBUTES = [
    { 'info' => %w[n lat lon geoid url tzinfo slug zoom nr ns nsr p f _h def_pressure_mm def_pressure_pa] },
    { 'fact' => %w[obs_time uptime feels_like icon daytime polar prec_prob
                   season source soil_moisture soil_temp uv_index wind_gust] }
  ].freeze

  def execute(lat:, long:)
    weather_json = weather_json(lat, long)
    cleaned_up_json = clean_up_json(weather_json).symbolize_keys

    { **cleaned_up_json[:info].symbolize_keys, **cleaned_up_json[:fact].symbolize_keys }
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
      json_key = rej_attr.keys.first

      json[json_key] = json[json_key].except(*rej_attr.values.first)
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
