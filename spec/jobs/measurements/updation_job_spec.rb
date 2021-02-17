# frozen_string_literal: true

describe Measurements::UpdationJob, type: :job do
  describe '#perform' do
    subject { described_class.perform_now(measurement) }

    let(:measurement) { instance_double(Measurement, json: measurement_json, geo_point: geo_point) }
    let(:geo_point) { instance_double(GeoPoint) }
    let(:measurement_json) { double(:measurement_json) }
    let(:action_cable_server) { double(:server) }
    let(:geo_point_value_calculation_service) { instance_double(MeasurementsCore::GeoPointValueCalculationService) }

    before do
      allow(MeasurementsCore::GeoPointValueCalculationService).to receive(:new)
        .with(geo_point).and_return(geo_point_value_calculation_service)
      allow(geo_point_value_calculation_service).to receive(:calculate).with(no_args)

      allow(ActionCable).to receive(:server).with(no_args).and_return(action_cable_server)
      allow(action_cable_server).to receive(:broadcast)
        .with('measurements_channel', action: 'update', measurement: measurement_json)
    end

    it 'call geo point value calculation service' do
      expect(geo_point_value_calculation_service).to receive(:calculate).with(no_args)

      subject
    end

    it 'broadcasts measurement to creation channel' do
      expect(action_cable_server).to receive(:broadcast)
        .with('measurements_channel', action: 'update', measurement: measurement_json)

      subject
    end
  end
end
