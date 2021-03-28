# frozen_string_literal: true

describe Measurements::CreationJob, type: :job do
  describe '#perform' do
    subject { described_class.perform_now(measurement) }

    let(:measurement) { instance_double(Measurement, json: measurement_json) }
    let(:measurement_json) { double(:measurement_json) }
    let(:action_cable_server) { double(:server) }

    before do
      allow(ActionCable).to receive(:server).with(no_args).and_return(action_cable_server)
      allow(action_cable_server).to receive(:broadcast)
        .with('measurements_channel', action: 'create', measurement: measurement_json)
    end

    it 'broadcasts measurement to creation channel' do
      expect(action_cable_server).to receive(:broadcast)
        .with('measurements_channel', action: 'create', measurement: measurement_json)

      subject
    end
  end
end
