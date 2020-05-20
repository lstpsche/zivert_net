# frozen_string_literal: true

describe User, type: :model do
  subject { user }

  let(:username) { 'some username' }
  let(:user) { build_stubbed(:user, username: username) }

  describe '#email_changed?' do
    subject { super().email_changed? }

    it { is_expected.to be(false) }
  end

  describe '#json' do
    subject { super().json }

    let(:user_serializer) { instance_double(UserSerializer, serializable_hash: serialized_hash) }
    let(:serialized_hash) { double(:serialized_hash) }

    before { allow(UserSerializer).to receive(:new).with(user).and_return(user_serializer) }

    it { is_expected.to eq(serialized_hash) }
  end
end
