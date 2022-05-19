# frozen_string_literal: true

describe CreateWeatherDataForMeasurement, type: :service do
  subject { described_class.new(static_measurement) }

  let(:static_measurement) { instance_double(StaticMeasurement, latitude: lat, longitude: long) }
  let(:lat) { double(:latitude) }
  let(:long) { double(:longitude) }

  describe '#execute' do
    subject { super().execute }

    let(:fetch_yandex_service) { instance_double(FetchYandexWeatherData) }
    let(:weather_json) do # not mocking mapping const on purpose (test const correctness)
      {
        temp: rand(10),
        condition: 'sample',
        cloudness: rand(10),
        prec_type: rand(10),
        prec_strength: rand(10),
        is_thunder: false,
        wind_speed: rand(10),
        wind_dir: 'w',
        pressure_mm: rand(10),
        pressure_pa: rand(10),
        humidity: rand(10)
      }
    end

    let(:mapped_weather_data) do
      {
        temperature: weather_json[:temp],
        condition: weather_json[:condition],
        cloudness: weather_json[:cloudness],
        precipitation_type: weather_json[:prec_type],
        precipitation_strength: weather_json[:prec_strength],
        is_thunder: weather_json[:is_thunder],
        wind_speed: weather_json[:wind_speed],
        wind_direction: weather_json[:wind_dir],
        pressure_mm: weather_json[:pressure_mm],
        pressure_pa: weather_json[:pressure_pa],
        humidity: weather_json[:humidity]
      }
    end

    before do
      allow(FetchYandexWeatherData).to receive(:new).with(no_args).and_return(fetch_yandex_service)
      allow(fetch_yandex_service).to receive(:execute).with(lat: lat, long: long).and_return(weather_json)
    end

    it 'creates WeatherData with gathered yandex data' do
      expect(WeatherData).to receive(:create).with(**mapped_weather_data, static_measurement: static_measurement)

      subject
    end
  end
end
