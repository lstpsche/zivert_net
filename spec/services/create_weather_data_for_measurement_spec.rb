# frozen_string_literal: true

describe CreateWeatherDataForMeasurement, type: :service do
  subject { described_class.new(static_measurement) }

  let(:static_measurement) { instance_double(StaticMeasurement, latitude: lat, longitude: long) }
  let(:lat) { double(:latitude) }
  let(:long) { double(:longitude) }

  describe '#execute' do
    subject { super().execute }

    let(:fetch_weather_service) { instance_double(FetchOpenWeatherData) }
    let(:weather_json) do
      {
        key1: 'value1',
        key2: 'value2'
      }
    end

    before do
      allow(FetchOpenWeatherData).to receive(:new).with(no_args).and_return(fetch_weather_service)
      allow(fetch_weather_service).to receive(:execute).with(lat: lat, long: long).and_return(weather_json)
    end

    it 'creates WeatherData with gathered weather data' do
      expect(WeatherData).to receive(:create).with(**weather_json, static_measurement: static_measurement)

      subject
    end
  end
end
