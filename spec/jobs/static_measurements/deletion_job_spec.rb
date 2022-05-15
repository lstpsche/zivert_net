# frozen_string_literal: true

describe StaticMeasurements::DeletionJob, type: :job do
  describe '#perform' do
    subject { described_class.perform_now(static_measurement) }

    let(:static_measurement) { instance_double(StaticMeasurement, json: static_measurement_json) }
    let(:static_measurement_json) { double(:static_measurement_json) }
    let(:action_cable_server) { double(:server) }

    before do
      allow(ActionCable).to receive(:server).with(no_args).and_return(action_cable_server)
      allow(action_cable_server).to receive(:broadcast)
        .with('static_measurements_channel', action: 'delete', static_measurement: static_measurement_json)
    end

    it 'broadcasts static measurement to creation channel' do
      expect(action_cable_server).to receive(:broadcast)
        .with('static_measurements_channel', action: 'delete', static_measurement: static_measurement_json)

      subject
    end
  end
end
