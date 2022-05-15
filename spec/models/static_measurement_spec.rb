# frozen_string_literal: true

describe StaticMeasurement, type: :model do
  subject { static_measurement }

  let(:static_measurement) { build_stubbed(:static_measurement) }

  before { allow(StaticMeasurements::CreationJob).to receive(:perform_now) }

  describe 'callbacks' do
    describe 'after_create' do
      subject { create(:static_measurement) }

      it 'calls measurements creation job' do
        expect(StaticMeasurements::CreationJob).to receive(:perform_now)

        subject
      end
    end

    describe 'after_update' do
      subject { static_measurement.update(value_urh: rand(100)) }

      let(:static_measurement) { create(:static_measurement) }

      it 'calls measurements updation job' do
        expect(StaticMeasurements::UpdationJob).to receive(:perform_now)

        subject
      end
    end

    describe 'after_destroy' do
      subject { static_measurement.destroy }

      let(:static_measurement) { create(:static_measurement) }

      before { allow(StaticMeasurements::DeletionJob).to receive(:perform_now) }

      it 'calls measurements deletion job' do
        expect(StaticMeasurements::DeletionJob).to receive(:perform_now)

        subject
      end
    end
  end

  describe '#json' do
    subject { super().json }

    let(:static_measurement_serializer) do
      instance_double(
        StaticMeasurementSerializer,
        serializable_hash: serialized_hash
      )
    end
    let(:serialized_hash) { double(:serialized_hash) }

    before do
      allow(StaticMeasurementSerializer)
        .to receive(:new)
        .with(static_measurement)
        .and_return(static_measurement_serializer)
    end

    it { is_expected.to eq(serialized_hash) }
  end
end
