# frozen_string_literal: true

describe Api::V1::ApplicationController, type: :controller do
  describe '#serialize_geo_point' do
    subject { controller.serialize_geo_point(geo_point) }

    let(:geo_point) { instance_double(GeoPoint) }
    let(:geo_point_serializer) { instance_double(GeoPointSerializer, serializable_hash: geo_point_hash) }
    let(:geo_point_hash) { double(:serializable_hash) }

    before { allow(GeoPointSerializer).to receive(:new).with(geo_point).and_return(geo_point_serializer) }

    it { is_expected.to eq(geo_point_hash) }
  end
end
