# frozen_string_literal: true

describe StaticMeasurementSerializer do
  let(:static_measurement) { create(:static_measurement) }

  describe 'attributes' do
    subject { described_class.new(static_measurement).serializable_hash }

    it 'serializes user', :aggregate_failures do
      result_json = subject[:data][:attributes]

      expect(result_json[:id]).to eq(static_measurement.id)
      expect(result_json[:longitude]).to eq(static_measurement.longitude)
      expect(result_json[:latitude]).to eq(static_measurement.latitude)
      expect(result_json[:value_urh]).to eq(static_measurement.value_urh)
      expect(result_json[:value_ush]).to eq(static_measurement.value_ush)
      expect(result_json[:is_static]).to eq(static_measurement.is_static)
      expect(result_json[:station_name]).to eq(static_measurement.station_name)
      expect(result_json[:user_id]).to eq(static_measurement.user_id)
      expect(result_json[:created_at]).to eq(static_measurement.created_at)
    end
  end
end
