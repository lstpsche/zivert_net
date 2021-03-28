# frozen_string_literal: true

describe MeasurementSerializer do
  let(:measurement) { create(:measurement) }

  describe 'attributes' do
    subject { described_class.new(measurement).serializable_hash }

    it 'serializes user', :aggregate_failures do
      result_json = subject[:data][:attributes]

      expect(result_json[:id]).to eq(measurement.id)
      expect(result_json[:longitude]).to eq(measurement.longitude)
      expect(result_json[:latitude]).to eq(measurement.latitude)
      expect(result_json[:value]).to eq(measurement.value)
      expect(result_json[:user_id]).to eq(measurement.user_id)
    end
  end
end
