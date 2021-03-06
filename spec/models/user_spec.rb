# frozen_string_literal: true

describe User, type: :model do
  subject { user }

  let(:username) { 'some username' }
  let(:user) { build_stubbed(:user, username: username) }

  describe 'callbacks' do
    describe 'after_create' do
      subject { create(:user) }

      it 'calls users creation job' do
        expect(Users::CreationJob).to receive(:perform_now)

        subject
      end
    end

    describe 'after_update' do
      subject { user.update(first_name: 'another name') }

      let!(:user) { create(:user) }

      it 'calls users updation job' do
        expect(Users::UpdationJob).to receive(:perform_now)

        subject
      end
    end

    describe 'after_destroy' do
      subject { user.destroy }

      let!(:user) { create(:user) }

      it 'calls users deletion job' do
        expect(Users::DeletionJob).to receive(:perform_now)

        subject
      end
    end
  end

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

  describe '.username_unique?' do
    subject { described_class.username_unique?(username) }

    before { create(:user, username: 'existing_username') }

    context 'when username is not unique' do
      let(:username) { 'Existing_Username' }

      it { is_expected.to be(false) }
    end

    context 'when username is unique' do
      let(:username) { 'not_existing_username' }

      it { is_expected.to be(true) }
    end
  end
end
