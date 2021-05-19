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
      subject { measurement.update(value_urh: rand(100)) }

      let(:measurement) { create(:measurement) }

      it 'calls measurements updation job' do
        expect(Measurements::UpdationJob).to receive(:perform_now)

        subject
      end
    end

    describe 'after_destroy' do
      subject { measurement.destroy }

      let(:measurement) { create(:measurement) }

      before { allow(Measurements::DeletionJob).to receive(:perform_now) }

      it 'calls measurements deletion job' do
        expect(Measurements::DeletionJob).to receive(:perform_now)

        subject
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
end
