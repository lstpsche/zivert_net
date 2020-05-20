# frozen_string_literal: true

describe Api::V1::MapController, type: :controller do
  describe 'GET index' do
    subject { get(:index) }

    let(:geo_point1) { instance_double(GeoPoint, json: serialized_geo_point1) }
    let(:geo_point2) { instance_double(GeoPoint, json: serialized_geo_point2) }

    let(:serialized_geo_point1) { double(:serialized_hash) }
    let(:serialized_geo_point2) { double(:serialized_hash) }

    let(:expected_result) { { geoPoints: [serialized_geo_point1, serialized_geo_point2] }.to_json }

    before { allow(GeoPoint).to receive(:all).with(no_args).and_return([geo_point1, geo_point2]) }

    it 'renders json with geo points' do
      subject
      expect(response.body).to eq(expected_result)
    end
  end
end
