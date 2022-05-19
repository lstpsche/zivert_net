# frozen_string_literal: true

describe FetchYandexWeatherData, type: :service do
  subject { described_class.new }

  describe '#execute' do
    subject { super().execute(lat: lat, long: long) }

    let(:lat) { double(:latitude) }
    let(:long) { double(:longitude) }

    let(:yandex_api_key) { double(:yandex_api_key) }
    let(:yandex_api_url) { double(:yandex_api_url) }
    let(:rejected_attributes) do
      [
        { 'info' => ['key3'] },
        { 'fact' => ['key5'] }
      ]
    end

    let(:request_params) do
      {
        lat: lat,
        long: long
      }
    end

    let(:request_headers) do
      {
        'X-Yandex-API-Key' => yandex_api_key
      }
    end

    let(:yandex_response) { instance_double(RestClient::Response, body: yandex_body_json) }
    let(:yandex_body_json) { double(:yandex_body_json) }
    let(:yandex_data) do
      {
        'key1' => 'value1',
        'key2' => 'value2',
        'info' => {
          'key3' => 'value3',
          'key4' => 'value4'
        },
        'fact' => {
          'key5' => 'value5',
          'key6' => 'value6'
        }
      }
    end

    let(:result) do
      {
        key4: 'value4',
        key6: 'value6'
      }
    end

    before do
      stub_const("#{described_class}::YANDEX_API_URL", yandex_api_url)
      stub_const("#{described_class}::REJECTED_ATTRIBUTES", rejected_attributes)

      allow(ENV).to receive(:[]).and_call_original
      allow(ENV).to receive(:[]).with('YANDEX_API_KEY').and_return(yandex_api_key)

      allow(RestClient::Request)
        .to receive(:execute)
        .with(
          method: :get,
          url: yandex_api_url,
          payload: request_params,
          headers: request_headers
        )
        .and_return(yandex_response)

      allow(JSON).to receive(:parse).with(yandex_body_json).and_return(yandex_data)
    end

    it 'fetches Yandex data and parses it' do
      expect(subject).to eq(result)
    end
  end
end
