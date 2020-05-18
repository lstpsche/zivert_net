# frozen_string_literal: true

describe Api::V1::AuthController, type: :controller do
  describe 'GET signed_in' do
    subject { get(:signed_in) }

    before do
      allow(controller).to receive(:user_signed_in?).with(no_args).and_return(signed_in)
    end

    context 'when user is signed in' do
      let(:signed_in) { true }
      let(:serialized_user) { double(:serializable_hash) }
      let(:expected_result) { { signed_in: true, user: serialized_user }.to_json }

      before { allow(controller).to receive(:serialized_current_user).with(no_args).and_return(serialized_user) }

      it 'renders json with serialized user' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end

    context 'when user is signed in' do
      let(:signed_in) { false }
      let(:expected_result) { { signed_in: false }.to_json }

      it 'renders json with signed_in: false' do
        subject
        expect(response.body).to eq(expected_result)
      end
    end
  end
end
