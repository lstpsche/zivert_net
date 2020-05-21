# frozen_string_literal: true

describe GeoPointSerializer do
  let(:geo_point) { create(:geo_point) }

  describe 'attributes' do
    subject { described_class.new(geo_point).serializable_hash }

    it 'serializes user', :aggregate_failures do
      result_json = subject[:data][:attributes]

      expect(result_json[:id]).to eq(geo_point.id)
      expect(result_json[:user_id]).to eq(geo_point.user_id)
      expect(result_json[:longitude]).to eq(geo_point.longitude)
      expect(result_json[:latitude]).to eq(geo_point.latitude)
      expect(result_json[:rad_value]).to eq(geo_point.rad_value)
      expect(result_json[:comment]).to eq(geo_point.comment)
    end
  end
end
