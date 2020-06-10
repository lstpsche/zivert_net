# frozen_string_literal: true

describe Api::V1::MeasurementsController, type: :controller do
  let(:user) { create(:user) }

  describe 'GET index' do
    subject { get(:index) }

    let(:measurement1) { instance_double(Measurement, json: serialized_measurement1) }
    let(:measurement2) { instance_double(Measurement, json: serialized_measurement2) }

    let(:serialized_measurement1) { double(:serialized_hash) }
    let(:serialized_measurement2) { double(:serialized_hash) }

    let(:expected_result) { { measurements: [serialized_measurement1, serialized_measurement2] }.to_json }

    before do
      sign_in(user)
      allow(Measurement).to receive(:all).with(no_args).and_return([measurement1, measurement2])
    end

    it { is_expected.to have_http_status(:ok) }

    it 'renders json with geo points' do
      subject

      expect(response.body).to eq(expected_result)
    end
  end

  describe 'GET SHOW' do
    subject { get(:show, params: { id: measurement_id }) }

    before { sign_in(user) }

    context 'when geo point was found' do
      let(:measurement_id) { rand(100) }
      let(:measurement) { instance_double(Measurement, json: serialized_measurement) }
      let(:serialized_measurement) { double(:serialized_hash) }
      let(:expected_result) { { measurement: serialized_measurement }.to_json }

      before { allow(Measurement).to receive(:find).with(measurement_id.to_s).and_return(measurement) }

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with given geo point' do
        subject

        expect(response.body).to eq(expected_result)
      end
    end

    context 'when geo point was not found' do
      let(:measurement_id) { rand(100) }
      let(:expected_result) { { error: 'not found error' }.to_json }

      before do
        allow(I18n).to receive(:t).with('errors.record_not_found').and_return('not found error')
        allow(Measurement).to receive(:find).and_raise(ActiveRecord::RecordNotFound)
      end

      it { is_expected.to have_http_status(:bad_request) }

      it 'renders json with given geo point' do
        subject

        expect(response.body).to eq(expected_result)
      end
    end
  end
end
