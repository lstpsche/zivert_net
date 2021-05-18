# frozen_string_literal: true

describe Api::V1::MapSettingsController, type: :controller do
  describe 'GET index' do
    subject { get(:index) }

    let(:options) { { units: 'units' } }

    before { stub_const('MapSettings::OPTIONS', options) }

    context 'when user is signed in' do
      let(:user) { create(:user) }
      let(:user_map_settings) { instance_double(MapSettings, json: serialized_map_settings) }
      let(:serialized_map_settings) { double(:hash) }
      let(:expected_result) do
        {
          map_settings: serialized_map_settings,
          map_settings_options: options
        }.to_json
      end

      before do
        sign_in(user)

        allow(controller).to receive(:current_user).with(no_args).and_return(user)
        allow(user).to receive(:map_settings).with(no_args).and_return(user_map_settings)
      end

      it 'renders json with map settings data' do
        subject

        expect(response.body).to eq(expected_result)
      end
    end

    context 'when user is not signed in' do
      let(:map_settings_defaults) { 'defaults' }

      let(:expected_result) do
        {
          map_settings: { data: { attributes: map_settings_defaults } },
          map_settings_options: options
        }.to_json
      end

      before { allow(MapSettings).to receive(:defaults).with(no_args).and_return(map_settings_defaults) }

      it 'renders json with map settings data' do
        subject

        expect(response.body).to eq(expected_result)
      end
    end
  end

  describe 'PUT update' do
    subject { put(:update, params: params) }

    let(:params) { { id: map_settings_id, map_settings: map_settings_params } }
    let(:map_settings_params) { { units: 'ush' } }

    context 'when user is signed in' do
      let(:user) { create(:user) }

      before { sign_in(user) }

      context 'when map_settings exist' do
        let(:map_settings) { create(:map_settings, units: 'urh') }
        let(:map_settings_id) { map_settings.id }

        before do
          allow(MapSettings).to receive(:find).with(map_settings_id.to_s).and_return(map_settings)
          allow(map_settings).to receive(:update).and_return(update_success)
        end

        context 'when update was successful' do
          let(:update_success) { true }
          let(:expected_result) do
            {
              success: true,
              errors: {}
            }.to_json
          end

          it 'renders success json response' do
            subject

            expect(response.body).to eq(expected_result)
          end
        end

        context 'when update was not successful' do
          let(:update_success) { false }
          let(:expected_result) do
            {
              success: false,
              errors: {}
            }.to_json
          end

          it 'renders success json response' do
            subject

            expect(response.body).to eq(expected_result)
          end
        end
      end

      context 'when map_settings do not exist' do
        let(:map_settings_id) { -1 }
        let(:expected_result) { { error: 'not found error' }.to_json }

        before { allow(I18n).to receive(:t).with('errors.record_not_found').and_return('not found error') }

        it 'renders error message' do
          subject

          expect(response.body).to eq(expected_result)
        end
      end
    end

    context 'when user is not signed in' do
      let(:map_settings_id) { -1 }

      it 'renders empty json' do
        subject

        expect(response.body).to eq({}.to_json)
      end
    end
  end
end
