# frozen_string_literal: true

describe Api::V1::DeviseCustom::RegistrationsController, type: :controller do
  before { @request.env['devise.mapping'] = Devise.mappings[:user] }

  describe 'private#check_username_uniqueness!' do
    subject { post(:create, params: params) }

    let(:params) do
      {
        user: {
          username: 'sample_username',
          nickname: 'Sample_Username',
          password: 'password',
          password_confirmation: 'password'
        }
      }
    end

    before { allow(User).to receive(:username_unique?).and_return(unique) }

    context 'when username is not unique' do
      let(:unique) { false }
      let(:expected_response) { { error: 'not_unique_error' }.to_json }

      before { allow(I18n).to receive(:t).with('errors.username_not_unique').and_return('not_unique_error') }

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with error' do
        subject
        expect(response.body).to eq(expected_response)
      end
    end

    context 'when username is unique' do
      let(:unique) { true }

      it 'renders json with new user' do
        subject
        expect(JSON.parse(response.body)['user']['data']['attributes']).to include(
          'first_name' => '',
          'last_name' => '',
          'username' => 'sample_username',
          'nickname' => 'Sample_Username'
        )
      end
    end
  end

  describe 'private#respond_with' do
    subject { put(:update, params: params) }

    let(:user) { create(:user) }
    let(:new_user) { create(:user) }
    let(:params) { { user: { username: new_user.username } } }

    let(:serialized_user) do
      {
        data: {
          id: user.id.to_s,
          type: 'user',
          attributes: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: new_user.username,
            nickname: user.nickname
          }
        }
      }
    end

    let(:expected_response) { { user: serialized_user }.to_json }

    before { sign_in(user) }

    it { is_expected.to have_http_status(:ok) }

    it 'renders json with user' do
      subject
      expect(response.body).to eq(expected_response)
    end
  end
end
