# frozen_string_literal: true

describe Measurement, type: :model do
  subject { measurement }

  let(:measurement) { build_stubbed(:measurement) }

  describe '#json' do
    subject { super().json }

    let(:measurement_serializer) { instance_double(MeasurementSerializer, serializable_hash: serialized_hash) }
    let(:serialized_hash) { double(:serialized_hash) }

    before { allow(MeasurementSerializer).to receive(:new).with(measurement).and_return(measurement_serializer) }

    it { is_expected.to eq(serialized_hash) }
  end

  describe '.create_initial' do
    subject { described_class.create_initial(geo_point: geo_point) }

    let(:geo_point) { instance_double(GeoPoint, user_id: rand(10), rad_value: rand(100)) }

    it 'creates measurement with geo point params' do
      expect(described_class).to receive(:create).with(
        geo_point: geo_point,
        user_id: geo_point.user_id,
        value: geo_point.rad_value
      )

      subject
    end
  end
end
