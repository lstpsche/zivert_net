# frozen_string_literal: true

describe FetchOpenWeatherData, type: :service do
  subject { described_class.new }

  describe '#execute' do
    subject { super().execute(lat: lat, long: long) }

    let(:lat) { 'lat' }
    let(:long) { 'long' }

    let(:open_weather_api_key) { 'test_key' }
    let(:open_weather_api_url) { 'http://test_url' }

    let(:request_params) do
      {
        lat: lat,
        lon: long,
        units: 'metric',
        exclude: 'minutely,hourly,daily,alerts',
        appid: open_weather_api_key
      }
    end

    let(:result) do
      {
        temperature: 13.86,
        pressure_pa: 1008,
        condition: 'Clouds',
        wind_speed: 3.3,
        wind_direction_deg: 191,
        humidity: 77,
        wind_direction: 's',
        pressure_mm: 756.062176464
      }
    end

    let(:raw_response) { File.new("#{Rails.root}/spec/test_examples/open_weather_raw_response.txt") }

    before do
      stub_const("#{described_class}::OPEN_WEATHER_API_URL", open_weather_api_url)

      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with('OPEN_WEATHER_API_KEY').and_return(open_weather_api_key)

      stub_request(:get, 'http://test_url').with(query: request_params).to_return(raw_response)
    end

    it 'fetches OpenWeather data and parses it' do
      expect(subject).to eq(result)
    end
  end
end
