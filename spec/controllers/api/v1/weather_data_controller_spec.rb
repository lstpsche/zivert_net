# frozen_string_literal: true

describe Api::V1::WeatherDataController, type: :controller do
  let(:user) { create(:user) }

  describe 'GET index' do
    subject { get(:index) }

    let(:weather_data1) { instance_double(WeatherData, json: serialized_weather_data1) }
    let(:weather_data2) { instance_double(WeatherData, json: serialized_weather_data2) }

    let(:serialized_weather_data1) { double(:serialized_hash) }
    let(:serialized_weather_data2) { double(:serialized_hash) }

    let(:expected_result) { { measurements: [serialized_weather_data1, serialized_weather_data2] }.to_json }

    before do
      sign_in(user)

      allow(WeatherData).to receive(:all).with(no_args).and_return([weather_data1, weather_data2])
    end

    it { is_expected.to have_http_status(:ok) }
  end
end
