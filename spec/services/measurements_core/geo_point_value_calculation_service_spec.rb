# frozen_string_literal: true

describe MeasurementsCore::GeoPointValueCalculationService, type: :service do
  subject { described_class.new(geo_point) }

  describe '#calculate' do
    subject { super().calculate }

    let(:geo_point) { instance_double(GeoPoint, measurements: [measurement1, measurement2]) }
    let(:measurement1) { instance_double(Measurement, value: rand(10)) }
    let(:measurement2) { instance_double(Measurement, value: rand(10)) }

    let(:expected_value) { [measurement1.value + measurement2.value].sum(0.0) / 2 }

    before { allow(geo_point).to receive(:update).with(rad_value: expected_value) }

    it 'updates geo_point with calculated value' do
      expect(geo_point).to receive(:update).with(rad_value: expected_value)

      subject
    end
  end
end
