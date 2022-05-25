# frozen_string_literal: true

describe StaticMeasurement, type: :model do
  subject { static_measurement }

  let(:static_measurement) { build_stubbed(:static_measurement) }
  let(:weather_data_service) { instance_double(CreateWeatherDataForMeasurement) }

  before do
    allow(StaticMeasurements::CreationJob).to receive(:perform_now)
    allow(CreateWeatherDataForMeasurement).to receive(:new).and_return(weather_data_service)
    allow(weather_data_service).to receive(:execute).with(no_args)
  end

  describe 'callbacks' do
    describe 'after_create' do
      subject { create(:static_measurement) }

      it 'calls measurements creation job' do
        expect(StaticMeasurements::CreationJob).to receive(:perform_now)

        subject
      end

      it 'calls weather data creation' do
        expect(weather_data_service).to receive(:execute).with(no_args)

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

  describe '.latest_measurements' do
    subject { described_class.latest_measurements }

    let(:hundred_measurements) { [measurement1, measurement2, measurement3] }
    let(:measurement1) { instance_double(StaticMeasurement, station_name: 'test1') }
    let(:measurement2) { instance_double(StaticMeasurement, station_name: 'test2') }
    let(:measurement3) { instance_double(StaticMeasurement, station_name: 'test2') } # not unique on purpose
    let(:expected_result) { [measurement1, measurement2] }

    before { allow(described_class).to receive(:first).with(100).and_return(hundred_measurements) }

    it 'gets uniq stations from the first 100' do
      expect(subject).to eq(expected_result)
    end
  end

  describe '#update_value' do
    subject { static_measurement.update_value(new_value_ush) }

    let(:new_value_ush) { 100 }
    let(:rejected_attributes) { 'id' }

    before { stub_const("#{described_class}::REJECTED_ATTRIBUTES", rejected_attributes) }

    it 'creates new static measurement with new value_urh' do
      expect(described_class).to receive(:create).with(
        static_measurement.attributes.except(rejected_attributes).merge('value_ush' => new_value_ush)
      )

      subject
    end
  end
end
