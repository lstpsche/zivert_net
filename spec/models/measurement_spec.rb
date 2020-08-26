# frozen_string_literal: true

describe Measurement, type: :model do
  subject { measurement }

  let(:measurement) { build_stubbed(:measurement) }

  before { allow(Measurements::CreationJob).to receive(:perform_now) }

  describe 'callbacks' do
    describe 'after_create' do
      subject { create(:measurement) }

      it 'calls measurements creation job' do
        expect(Measurements::CreationJob).to receive(:perform_now)

        subject
      end
    end

    describe 'after_update' do
      subject { measurement.update(value: rand(100)) }

      let(:measurement) { create(:measurement) }

      it 'calls measurements updation job' do
        expect(Measurements::UpdationJob).to receive(:perform_now)

        subject
      end
    end

    describe 'after_destroy' do
      subject { measurement.destroy }

      let!(:measurement) { create(:measurement, geo_point: geo_point) }
      let(:geo_point) { create(:geo_point, measurements: geo_point_measurements) }

      before { allow(Measurements::DeletionJob).to receive(:perform_now) }

      context 'when geo point has no more measurements' do
        let(:geo_point_measurements) { [] }

        before { allow(geo_point).to receive(:destroy).with(no_args) }

        it 'calls measurements deletion job' do
          expect(Measurements::DeletionJob).to receive(:perform_now)

          subject
        end

        it 'destroys geo point' do
          expect(geo_point).to receive(:destroy).with(no_args)

          subject
        end
      end

      context 'when geo point has more measurements' do
        let(:geo_point_measurements) { [create(:measurement), create(:measurement)] }

        it 'calls measurements deletion job' do
          expect(Measurements::DeletionJob).to receive(:perform_now)

          subject
        end

        it 'does not destroy geo point' do
          expect(geo_point).not_to receive(:destroy)

          subject
        end
      end
    end
  end

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
