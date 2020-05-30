# frozen_string_literal: true

describe Api::V1::DeviseCustom::SessionsController, type: :controller do
  describe 'private#respond_with' do
    subject { post(:create, params: params) }

    let(:user) { create(:user) }
    let(:params) { { user: { username: user.username, nickname: user.nickname, password: user.password } } }

    let(:stubbed_current_user) { instance_double(User, present?: signed_in) }

    let(:serialized_user) do
      {
        data: {
          id: user.id.to_s,
          type: 'user',
          attributes: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            nickname: user.nickname
          }
        }
      }
    end

    let(:expected_response) do
      {
        signed_in: signed_in,
        user: serialized_user
      }.to_json
    end

    before do
      @request.env['devise.mapping'] = Devise.mappings[:user]
      allow(user).to receive(:json).with(no_args).and_return(serialized_user)
      allow(controller).to receive(:current_user).and_return(stubbed_current_user)
    end

    context 'when user signed in' do
      let(:signed_in) { true }

      it 'renders json with signed_in: false and user' do
        subject
        expect(response.body).to eq(expected_response)
      end
    end

    context 'when user is not signed in' do
      let(:signed_in) { false }

      it 'renders json with signed_in: false and user' do
        subject
        expect(response.body).to eq(expected_response)
      end
    end
  end
end
