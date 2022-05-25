# frozen_string_literal: true

describe WeatherDataSerializer do
  let(:weather_data) { create(:weather_data) }
  let(:weather_data_service) { instance_double(CreateWeatherDataForMeasurement) }

  before do
    allow(StaticMeasurements::CreationJob).to receive(:perform_now)
    allow(CreateWeatherDataForMeasurement).to receive(:new).and_return(weather_data_service)
    allow(weather_data_service).to receive(:execute).with(no_args)
  end

  describe 'attributes' do
    subject { described_class.new(weather_data).serializable_hash }

    it 'serializes user', :aggregate_failures do
      result_json = subject[:data][:attributes]

      expect(result_json[:id]).to eq(weather_data.id)
      expect(result_json[:temperature]).to eq(weather_data.temperature)
      expect(result_json[:pressure_mm]).to eq(weather_data.pressure_mm)
      expect(result_json[:pressure_pa]).to eq(weather_data.pressure_pa)
      expect(result_json[:wind_speed]).to eq(weather_data.wind_speed)
      expect(result_json[:humidity]).to eq(weather_data.humidity)
      expect(result_json[:condition]).to eq(weather_data.condition)
      expect(result_json[:wind_direction]).to eq(weather_data.wind_direction)
      expect(result_json[:wind_direction_deg]).to eq(weather_data.wind_direction_deg)
      expect(result_json[:static_measurement_id]).to eq(weather_data.static_measurement_id)
      expect(result_json[:created_at]).to eq(weather_data.created_at)
    end
  end
end
