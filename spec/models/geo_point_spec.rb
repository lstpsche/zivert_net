# frozen_string_literal: true

describe GeoPoint, type: :model do
  subject { geo_point }

  let(:geo_point) { build_stubbed(:geo_point) }

  describe '#json' do
    subject { super().json }

    let(:geo_point_serializer) { instance_double(GeoPointSerializer, serializable_hash: serialized_hash) }
    let(:serialized_hash) { double(:serialized_hash) }

    before { allow(GeoPointSerializer).to receive(:new).with(geo_point).and_return(geo_point_serializer) }

    it { is_expected.to eq(serialized_hash) }
  end
end
