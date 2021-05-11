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
  end

  describe 'GET SHOW' do
    subject { get(:show, params: { id: measurement_id }) }

    before { sign_in(user) }

    context 'when measurement was found' do
      let(:measurement_id) { rand(100) }
      let(:measurement) { instance_double(Measurement, json: serialized_measurement) }
      let(:serialized_measurement) { double(:serialized_hash) }
      let(:expected_result) { { measurement: serialized_measurement }.to_json }

      before { allow(Measurement).to receive(:find).with(measurement_id.to_s).and_return(measurement) }

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with given measurement' do
        subject

        expect(response.body).to eq(expected_result)
      end
    end

    context 'when measurement was not found' do
      let(:measurement_id) { rand(100) }
      let(:expected_result) { { error: 'not found error' }.to_json }

      before do
        allow(I18n).to receive(:t).with('errors.record_not_found').and_return('not found error')
        allow(Measurement).to receive(:find).and_raise(ActiveRecord::RecordNotFound)
      end

      it { is_expected.to have_http_status(:bad_request) }

      it 'renders json with given measurement' do
        subject

        expect(response.body).to eq(expected_result)
      end
    end
  end

  describe 'POST create' do
    subject { post(:create, params: params) }

    let(:params) { { measurement: { value: value, comment: comment, latitude: latitude, longitude: longitude } } }
    let(:value) { rand(100) }
    let(:comment) { 'some comment' }
    let(:latitude) { '53.213212' }
    let(:longitude) { '27.123123' }

    let(:measurement) { instance_double(Measurement, user_id: user.id, save: saved) }
    let(:user_measurements) { double(:user_measurements, build: measurement) }
    let(:stubbed_user) { instance_double(User, measurements: user_measurements) }

    before do
      sign_in(user)

      allow(controller).to receive(:current_user).with(no_args).and_return(stubbed_user)
    end

    context 'when new measurement was saved' do
      let(:saved) { true }
      let(:serialized_measurement) { double(:serialized_measurement) }
      let(:expected_result) do
        {
          success: true,
          errors: []
        }.to_json
      end

      before do
        allow(measurement).to receive(:json).with(no_args).and_return(serialized_measurement)
        allow(measurement)
          .to receive_message_chain(:errors, :messages)
          .with(no_args).with(no_args)
          .and_return([])
      end

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with newly created measurement' do
        subject

        expect(response.body).to eq(expected_result)
      end
    end

    context 'when measurement was not saved' do
      let(:saved) { false }
      let(:expected_result) do
        {
          success: false,
          errors: 'error message'
        }.to_json
      end

      before do
        allow(measurement)
          .to receive_message_chain(:errors, :messages)
          .with(no_args).with(no_args)
          .and_return('error message')
      end

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with error message' do
        subject

        expect(response.body).to eq(expected_result)
      end
    end
  end

  describe 'DELETE destroy' do
    subject { delete(:destroy, params: params) }

    let(:params) { { id: measurement_id } }
    let(:measurement_id) { rand(100) }

    before do
      allow(I18n).to receive(:t).and_call_original
      allow(I18n).to receive(:t).with('errors.not_permitted').and_return('not permitted error')
      allow(I18n).to receive(:t).with('errors.record_not_found').and_return('not found error')
    end

    context 'when user authenticated' do
      before { sign_in(user) }

      context 'when measurement was found' do
        let(:measurement) { instance_double(Measurement, user_id: measurement_user_id, destroy: destroyed) }

        before { allow(Measurement).to receive(:find).with(measurement_id.to_s).and_return(measurement) }

        context 'when measurement belongs to user' do
          let(:measurement_user_id) { user.id }

          context 'when measurement was destroyed' do
            let(:destroyed) { true }
            let(:serialized_measurement) { double(:serialized_measurement) }
            let(:expected_result) do
              {
                success: true,
                errors: []
              }.to_json
            end

            before do
              allow(measurement).to receive(:json).with(no_args).and_return(serialized_measurement)
              allow(measurement)
                .to receive_message_chain(:errors, :messages)
                .with(no_args).with(no_args)
                .and_return([])
            end

            it { is_expected.to have_http_status(:ok) }

            it 'renders json with error message' do
              subject

              expect(response.body).to eq(expected_result)
            end
          end

          context 'when measurement was not destroyed' do
            let(:destroyed) { false }
            let(:measurement_errors_messages) { double(:measurement_errors_messages) }
            let(:expected_result) { { success: false, errors: measurement_errors_messages }.to_json }

            before do
              allow(measurement).to receive_message_chain(:errors, :messages)
                .with(no_args).with(no_args)
                .and_return(measurement_errors_messages)
            end

            it { is_expected.to have_http_status(:ok) }

            it 'renders json with error message' do
              subject

              expect(response.body).to eq(expected_result)
            end
          end
        end

        context 'when measurement does not belong to user' do
          let(:measurement_user_id) { user.id + 1 }
          let(:expected_result) { { error: 'not permitted error' }.to_json }
          let(:destroyed) { nil }

          it { is_expected.to have_http_status(:bad_request) }

          it 'renders json with error message' do
            subject

            expect(response.body).to eq(expected_result)
          end
        end
      end

      context 'when measurement was not found' do
        let(:expected_result) { { error: 'not found error' }.to_json }

        before { allow(Measurement).to receive(:find).and_raise(ActiveRecord::RecordNotFound) }

        it { is_expected.to have_http_status(:bad_request) }

        it 'renders json with error message' do
          subject

          expect(response.body).to eq(expected_result)
        end
      end
    end

    context 'when user is not authenticated' do
      it { is_expected.to redirect_to(user_session_path) }
    end
  end
end
