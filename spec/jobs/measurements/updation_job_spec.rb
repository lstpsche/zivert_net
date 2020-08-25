# frozen_string_literal: true

describe Measurements::UpdationJob, type: :job do
  describe '#perform' do
    subject { described_class.perform_now(measurement) }

    let(:measurement) { instance_double(Measurement, json: measurement_json) }
    let(:measurement_json) { double(:measurement_json) }
    let(:action_cable_server) { double(:server) }

    before { allow(ActionCable).to receive(:server).with(no_args).and_return(action_cable_server) }

    it 'broadcasts measurement to creation channel' do
      expect(action_cable_server).to receive(:broadcast)
        .with('measurements_updation_channel', measurement: measurement_json)
      subject
    end
  end
end
