# frozen_string_literal: true

describe Api::V1::CurrentUserController, type: :controller do
  describe 'GET index' do
    subject { get(:index) }

    context 'when user is signed in' do
      let(:user) { create(:user) }
      let(:user_serializer) { instance_double(UserSerializer, serializable_hash: user_serialized_hash) }
      let(:user_serialized_hash) { double(:user_serialized_hash) }

      let(:expected_result) { { signed_in: true, user: user_serialized_hash }.to_json }

      before do
        sign_in(user)
        allow(UserSerializer).to receive(:new).with(user).and_return(user_serializer)
      end

      it 'renders json with user' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end

    context 'when user is signed in' do
      let(:expected_result) { { signed_in: false }.to_json }

      it 'renders json with signed_in: false' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end
  end
end
