# frozen_string_literal: true

describe Measurement, type: :model do
  subject { measurement }

  let(:measurement) { build_stubbed(:measurement) }

  describe 'callbacks' do
    describe 'after_create' do
      subject { create(:measurement) }

      it 'calls measurements creation job' do
        expect(Measurements::CreationJob).to receive(:perform_now)

        subject
      end
    end

    describe 'after_update' do
      subject { geo_point.update(value: rand(100)) }

      let!(:measurement) { create(:measurement) }

      before { allow(Measurements::CreationJob).to receive(:perform_now) }

      it 'calls measurements updation job' do
        expect(Measurements::UpdationJob).to receive(:perform_now)

        subject
      end
    end

    describe 'after_destroy' do
      subject { measurement.destroy }

      let!(:measurement) { create(:measurement, geo_point: geo_point) }
      let(:geo_point) { instance_double(GeoPoint, measurements: geo_point_measurements) }

      before do
        allow(Measurements::CreationJob).to receive(:perform_now)
        allow(Measurements::DeletionJob).to receive(:perform_now)
      end

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
        let(:geo_point_measurements) { [instance_double(Measurement), instance_double(Measurement)] }

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
