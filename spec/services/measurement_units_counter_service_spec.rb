# frozen_string_literal: true

describe MeasurementUnitsCounterService, type: :service do
  subject { described_class.new(measurement) }

  describe '#count_values' do
    subject { super().count_values }

    let(:measurement) { instance_double(Measurement, attributes: measurement_attributes) }
    let(:measurement_attributes) { { 'example_attr1' => 15.0, 'example_attr2' => nil } }
    let(:units_coefs) { { 'example_attr1' => 1, 'example_attr2' => 100 } }
    let(:expected_result) { { 'example_attr1' => 15.0, 'example_attr2' => 0.15 } }

    before { stub_const("#{described_class}::UNITS_COEFS", units_coefs) }

    it { is_expected.to eq(expected_result) }
  end
end
