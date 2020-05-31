# frozen_string_literal: true

describe Api::V1::GeoPointsController, type: :controller do
  let(:user) { create(:user) }

  describe 'GET index' do
    subject { get(:index) }

    let(:geo_point1) { instance_double(GeoPoint, json: serialized_geo_point1) }
    let(:geo_point2) { instance_double(GeoPoint, json: serialized_geo_point2) }

    let(:serialized_geo_point1) { double(:serialized_hash) }
    let(:serialized_geo_point2) { double(:serialized_hash) }

    let(:expected_result) { { geoPoints: [serialized_geo_point1, serialized_geo_point2] }.to_json }

    before do
      sign_in(user)
      allow(GeoPoint).to receive(:all).with(no_args).and_return([geo_point1, geo_point2])
    end

    it { is_expected.to have_http_status(:ok) }

    it 'renders json with geo points' do
      subject
      expect(response.body).to eq(expected_result)
    end
  end

  describe 'GET show' do
    subject { get(:show, params: { id: geo_point_id }) }

    before { sign_in(user) }

    context 'when geo point was found' do
      let(:geo_point_id) { rand(100) }
      let(:geo_point) { instance_double(GeoPoint, json: serialized_geo_point) }
      let(:serialized_geo_point) { double(:serialized_hash) }
      let(:expected_result) { { geoPoint: serialized_geo_point }.to_json }

      before { allow(GeoPoint).to receive(:find).with(geo_point_id.to_s).and_return(geo_point) }

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with given geo point' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end

    context 'when geo point was not found' do
      let(:geo_point_id) { rand(100) }
      let(:expected_result) { { error: 'not found error' }.to_json }

      before do
        allow(I18n).to receive(:t).with('errors.record_not_found').and_return('not found error')
        allow(GeoPoint).to receive(:find).and_raise(ActiveRecord::RecordNotFound)
      end

      it { is_expected.to have_http_status(:bad_request) }

      it 'renders json with given geo point' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end
  end

  describe 'POST create' do
    subject { post(:create, params: params) }

    let(:params) { { geoPoint: { latitude: latitude, longitude: longitude } } }
    let(:latitude) { rand(100) }
    let(:longitude) { rand(100) }
    let(:rad_value) { rand(100) }

    let(:geo_point) { instance_double(GeoPoint, user_id: user.id, save: saved) }
    let(:user_geo_points) { double(:user_geo_point, build: geo_point) }

    let(:stubbed_user) { instance_double(User, geo_points: user_geo_points) }

    before do
      sign_in(user)
      allow(controller).to receive(:current_user).with(no_args).and_return(stubbed_user)
    end

    context 'when new geo point was saved' do
      let(:saved) { true }
      let(:serialized_geo_point) { double(:serialized_hash) }
      let(:action_cable_server) { double(:action_cable_server) }
      let(:expected_result) { { success: true }.to_json }

      before do
        allow(geo_point).to receive(:json).with(no_args).and_return(serialized_geo_point)
        allow(ActionCable).to receive(:server).with(no_args).and_return(action_cable_server)
        allow(action_cable_server)
          .to receive(:broadcast)
          .with('geo_points_channel', action: :create, geoPoint: serialized_geo_point)
      end

      it { is_expected.to have_http_status(:ok) }

      it 'broadcasts geo point to channel' do
        expect(action_cable_server)
          .to receive(:broadcast)
          .with('geo_points_channel', action: :create, geoPoint: serialized_geo_point)

        subject
      end

      it 'renders json with newly created geo point' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end

    context 'when new geo point was not saved' do
      let(:saved) { false }
      let(:expected_result) do
        {
          success: false,
          errors: 'error message'
        }.to_json
      end

      before do
        allow(geo_point)
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

  describe 'PUT update' do
    subject { patch(:update, params: params) }

    let(:geo_point_id) { rand(100) }
    let(:params) { { id: geo_point_id, geoPoint: { latitude: latitude, longitude: longitude } } }
    let(:geo_point_id) { rand(100) }
    let(:latitude) { rand(100) }
    let(:longitude) { rand(100) }

    before do
      allow(I18n).to receive(:t).and_call_original
      allow(I18n).to receive(:t).with('errors.not_permitted').and_return('not permitted error')
      allow(I18n).to receive(:t).with('errors.record_not_found').and_return('not found error')
    end

    context 'when user authenticated' do
      before { sign_in(user) }

      context 'when geo point was found' do
        let(:geo_point) { instance_double(GeoPoint, user_id: geo_point_user_id, update: updated) }

        before { allow(GeoPoint).to receive(:find).with(geo_point_id.to_s).and_return(geo_point) }

        context 'when geo point belongs to user' do
          let(:geo_point_user_id) { user.id }

          context 'when geo point was updated' do
            let(:updated) { true }
            let(:serialized_geo_point) { double(:serialized_geo_point) }
            let(:action_cable_server) { double(:action_cable_server) }
            let(:expected_result) { { success: true }.to_json }

            before do
              allow(geo_point).to receive(:json).with(no_args).and_return(serialized_geo_point)
              allow(ActionCable).to receive(:server).with(no_args).and_return(action_cable_server)
              allow(action_cable_server)
                .to receive(:broadcast)
                .with('geo_points_channel', action: :update, geoPoint: serialized_geo_point)
            end


            it { is_expected.to have_http_status(:ok) }

            it 'broadcasts geo point to channel' do
              expect(action_cable_server)
                .to receive(:broadcast)
                .with('geo_points_channel', action: :update, geoPoint: serialized_geo_point)

              subject
            end

            it 'renders json with error message' do
              subject
              expect(response.body).to eq(expected_result)
            end
          end

          context 'when geo point was not updated' do
            let(:updated) { false }
            let(:geo_point_errors_messages) { double(:geo_point_errors_messages) }
            let(:expected_result) { { success: false, errors: geo_point_errors_messages }.to_json }

            before do
              allow(geo_point).to receive_message_chain(:errors, :messages)
                .with(no_args).with(no_args)
                .and_return(geo_point_errors_messages)
            end

            it { is_expected.to have_http_status(:ok) }

            it 'renders json with error message' do
              subject
              expect(response.body).to eq(expected_result)
            end
          end
        end

        context 'when geo point does not belong to user' do
          let(:geo_point_user_id) { user.id + 1 }
          let(:expected_result) { { error: 'not permitted error' }.to_json }
          let(:updated) { nil }

          it { is_expected.to have_http_status(:bad_request) }

          it 'renders json with error message' do
            subject
            expect(response.body).to eq(expected_result)
          end
        end
      end

      context 'when geo point was not found' do
        let(:expected_result) { { error: 'not found error' }.to_json }

        before { allow(GeoPoint).to receive(:find).and_raise(ActiveRecord::RecordNotFound) }

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

  describe 'DELETE destroy' do
    subject { delete(:destroy, params: params) }

    let(:params) { { id: geo_point_id } }
    let(:geo_point_id) { rand(100) }

    before do
      allow(I18n).to receive(:t).and_call_original
      allow(I18n).to receive(:t).with('errors.not_permitted').and_return('not permitted error')
      allow(I18n).to receive(:t).with('errors.record_not_found').and_return('not found error')
    end

    # sign_in(user)
    # allow(GeoPoint).to receive(:find).with(geo_point_id.to_s).and_return(geo_point)

    context 'when user authenticated' do
      before { sign_in(user) }

      context 'when geo point was found' do
        let(:geo_point) { instance_double(GeoPoint, user_id: geo_point_user_id, destroy: destroyed) }

        before { allow(GeoPoint).to receive(:find).with(geo_point_id.to_s).and_return(geo_point) }

        context 'when geo point belongs to user' do
          let(:geo_point_user_id) { user.id }

          context 'when geo point was destroyed' do
            let(:destroyed) { true }
            let(:serialized_geo_point) { double(:serialized_geo_point) }
            let(:action_cable_server) { double(:action_cable_server) }
            let(:expected_result) { { success: true }.to_json }

            before do
              allow(geo_point).to receive(:json).with(no_args).and_return(serialized_geo_point)
              allow(ActionCable).to receive(:server).with(no_args).and_return(action_cable_server)
              allow(action_cable_server)
                .to receive(:broadcast)
                .with('geo_points_channel', action: :destroy, geoPoint: serialized_geo_point)
            end

            it { is_expected.to have_http_status(:ok) }

            it 'broadcasts geo point to channel' do
              expect(action_cable_server)
                .to receive(:broadcast)
                .with('geo_points_channel', action: :destroy, geoPoint: serialized_geo_point)

              subject
            end

            it 'renders json with error message' do
              subject
              expect(response.body).to eq(expected_result)
            end
          end

          context 'when geo point was not destroyed' do
            let(:destroyed) { false }
            let(:geo_point_errors_messages) { double(:geo_point_errors_messages) }
            let(:expected_result) { { success: false, errors: geo_point_errors_messages }.to_json }

            before do
              allow(geo_point).to receive_message_chain(:errors, :messages)
                .with(no_args).with(no_args)
                .and_return(geo_point_errors_messages)
            end

            it { is_expected.to have_http_status(:ok) }

            it 'renders json with error message' do
              subject
              expect(response.body).to eq(expected_result)
            end
          end
        end

        context 'when geo point does not belong to user' do
          let(:geo_point_user_id) { user.id + 1 }
          let(:expected_result) { { error: 'not permitted error' }.to_json }
          let(:destroyed) { nil }

          it { is_expected.to have_http_status(:bad_request) }

          it 'renders json with error message' do
            subject
            expect(response.body).to eq(expected_result)
          end
        end
      end

      context 'when geo point was not found' do
        let(:expected_result) { { error: 'not found error' }.to_json }

        before { allow(GeoPoint).to receive(:find).and_raise(ActiveRecord::RecordNotFound) }

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
