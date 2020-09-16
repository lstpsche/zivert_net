# frozen_string_literal: true

describe Api::V1::DeviseCustom::RegistrationsController, type: :controller do
  before { @request.env['devise.mapping'] = Devise.mappings[:user] }

  describe 'private#verify_password!' do
    subject { put(:update, params: params) }

    let(:user) do
      create(:user, username: 'unique_username', password: user_password, password_confirmation: user_password)
    end
    let(:user_password) { 'pass' }
    let(:new_username) { 'new_unique_username' }
    let(:params) { { user: { username: new_username }, registration: { user: { current_password: params_password } } } }

    before { sign_in(user) }

    context 'when password is valid' do
      let(:params_password) { user_password }

      let(:serialized_user) do
        {
          data: {
            id: user.id.to_s,
            type: 'user',
            attributes: {
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              username: new_username,
              nickname: user.nickname,
              admin: user.admin
            }
          }
        }
      end

      let(:expected_response) { { user: serialized_user }.to_json }

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with user' do
        subject
        expect(response.body).to eq(expected_response)
      end
    end

    context 'when password is not valid' do
      let(:params_password) { 'another pass' }
      let(:error) { double(:error) }
      let(:expected_response) { { error: error }.to_json }

      before { allow(I18n).to receive(:t).with('errors.password_not_valid').and_return(error) }

      it { is_expected.to have_http_status(:ok) }

      it 'renders json with error' do
        subject
        expect(response.body).to eq(expected_response)
      end
    end
  end

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
      let(:error) { double(:error) }
      let(:expected_response) { { error: error }.to_json }

      before { allow(I18n).to receive(:t).with('errors.username_not_unique').and_return(error) }

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

    let(:user) { create(:user, username: 'unique_username') }
    let(:new_username) { 'new_unique_username' }
    let(:params) { { user: { username: new_username }, registration: { user: { current_password: user.password } } } }

    let(:serialized_user) do
      {
        data: {
          id: user.id.to_s,
          type: 'user',
          attributes: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: new_username,
            nickname: user.nickname,
            admin: user.admin
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
