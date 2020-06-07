# frozen_string_literal: true

describe GeoPoints::CreationJob, type: :job do
  describe '#perform' do
    subject { described_class.perform_now(geo_point) }

    let(:geo_point) { instance_double(GeoPoint, json: geo_point_json) }
    let(:geo_point_json) { double(:geo_point_json) }
    let(:action_cable_server) { double(:server) }

    before { allow(ActionCable).to receive(:server).with(no_args).and_return(action_cable_server) }

    it 'broadcasts geo point to creation channel' do
      expect(action_cable_server).to receive(:broadcast).with('geo_points_creation_channel', geoPoint: geo_point_json)
      subject
    end
  end
end
