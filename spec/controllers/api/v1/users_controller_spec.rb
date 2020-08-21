# frozen_string_literal: true

describe Api::V1::UsersController, type: :controller do
  describe 'GET index' do
    subject { get(:index) }

    let(:user1) { instance_double(User, json: serialized_user1) }
    let(:user2) { instance_double(User, json: serialized_user2) }

    let(:serialized_user1) { double(:serialized_hash) }
    let(:serialized_user2) { double(:serialized_hash) }

    let(:expected_result) { { users: [serialized_user1, serialized_user2] }.to_json }

    before { allow(User).to receive(:all).with(no_args).and_return([user1, user2]) }

    it { is_expected.to have_http_status(:ok) }

    it 'renders json with geo points' do
      subject

      expect(response.body).to eq(expected_result)
    end
  end
end
