# frozen_string_literal: true

describe Api::V1::DeviseCustom::RegistrationsController, type: :controller do
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
            username: new_user.username
          }
        }
      }
    end

    let(:expected_response) { { user: serialized_user }.to_json }

    before do
      sign_in(user)
      @request.env['devise.mapping'] = Devise.mappings[:user]
    end

    it 'renders json with user' do
      subject
      expect(response.body).to eq(expected_response)
    end
  end
end
