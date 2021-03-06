# frozen_string_literal: true

describe UserSerializer do
  let(:user) { create(:user) }

  describe 'attributes' do
    subject { described_class.new(user).serializable_hash }

    it 'serializes user', :aggregate_failures do
      result_json = subject[:data][:attributes]

      expect(result_json[:id]).to eq(user.id)
      expect(result_json[:first_name]).to eq(user.first_name)
      expect(result_json[:last_name]).to eq(user.last_name)
      expect(result_json[:username]).to eq(user.username)
      expect(result_json[:nickname]).to eq(user.nickname)
      expect(result_json[:admin]).to eq(user.admin)
    end
  end
end
