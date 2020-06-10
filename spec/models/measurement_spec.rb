# frozen_string_literal: true

describe Measurement, type: :model do
  describe '.create_initial' do
    subject { described_class.create_initial(geo_point: geo_point) }

    let(:geo_point) { instance_double(GeoPoint, user_id: rand(10), rad_value: rand(100)) }

    it 'creates measurement with geo point params' do
      expect(described_class).to receive(:create).with(
        geo_point: geo_point,
        user_id: geo_point.user_id,
        value: geo_point.rad_value
      )

      subject
    end
  end
end
