# frozen_string_literal: true

describe GeoPointsChannel, type: :channel do
  describe '#subscribed' do
    subject { subscribe }

    it 'successfully subscribes' do
      subject
      expect(subscription).to be_confirmed
    end
  end
end
