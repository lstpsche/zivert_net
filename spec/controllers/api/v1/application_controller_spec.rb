# frozen_string_literal: true

describe Api::V1::ApplicationController, type: :controller do
  describe '#serialized_current_user' do
    subject { controller.serialized_current_user }

    let(:user) { create(:user) }

    let(:user_serializer) { instance_double(UserSerializer, serializable_hash: serialized_user) }
    let(:serialized_user) { double(:serializable_hash) }

    before do
      sign_in(user)
      allow(UserSerializer).to receive(:new).with(user).and_return(user_serializer)
    end

    it { is_expected.to eq(serialized_user) }
  end

  describe '#serialize_geo_point' do
    subject { controller.serialize_geo_point(geo_point) }

    let(:geo_point) { instance_double(GeoPoint) }
    let(:geo_point_serializer) { instance_double(GeoPointSerializer, serializable_hash: serialized_geo_point) }
    let(:serialized_geo_point) { double(:serializable_hash) }

    before { allow(GeoPointSerializer).to receive(:new).with(geo_point).and_return(geo_point_serializer) }

    it { is_expected.to eq(serialized_geo_point) }
  end
end
