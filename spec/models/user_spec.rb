# frozen_string_literal: true

describe User, type: :model do
  subject { build_stubbed(:user, username: username) }

  let(:username) { 'some username' }

  describe '#email_changed?' do
    subject { super().email_changed? }

    it { is_expected.to be(false) }
  end
end
