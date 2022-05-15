# frozen_string_literal: true

describe Api::V1::StaticMeasurementsController, type: :controller do
  let(:user) { create(:user) }

  describe 'GET index' do
    subject { get(:index) }

    let(:static_measurement1) { instance_double(StaticMeasurement, json: serialized_measurement1) }
    let(:static_measurement2) { instance_double(StaticMeasurement, json: serialized_measurement2) }

    let(:serialized_measurement1) { double(:serialized_hash) }
    let(:serialized_measurement2) { double(:serialized_hash) }

    let(:expected_result) { { measurements: [serialized_measurement1, serialized_measurement2] }.to_json }

    before do
      sign_in(user)

      allow(StaticMeasurement).to receive(:all).with(no_args).and_return([static_measurement1, static_measurement2])
    end

    it { is_expected.to have_http_status(:ok) }
  end
end
