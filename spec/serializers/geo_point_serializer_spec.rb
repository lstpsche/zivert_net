# frozen_string_literal: true

describe GeoPointSerializer do
  let(:geo_point) { create(:geo_point, measurements: measurements) }
  let(:measurements) { [create(:measurement), create(:measurement)] }

  describe 'attributes' do
    subject { described_class.new(geo_point).serializable_hash }

    it 'serializes geo point', :aggregate_failures do
      result_json = subject[:data]
      attributes = result_json[:attributes]
      relationships = result_json[:relationships]

      expect(attributes[:id]).to eq(geo_point.id)
      expect(attributes[:user_id]).to eq(geo_point.user_id)
      expect(attributes[:longitude]).to eq(geo_point.longitude)
      expect(attributes[:latitude]).to eq(geo_point.latitude)
      expect(attributes[:rad_value]).to eq(geo_point.rad_value)

      measurements = relationships[:measurements][:data]
      expect(measurements.first).to eq(id: geo_point.measurements.first.id.to_s, type: :measurement)
    end
  end
end
