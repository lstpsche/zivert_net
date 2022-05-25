# frozen_string_literal: true

describe MapSettings, type: :model do
  subject { map_settings }

  let(:map_settings) { build_stubbed(:map_settings) }

  describe 'callbacks' do
    describe 'after_create' do
      subject { create(:map_settings, units: nil) }

      let(:defaults) { { units: 'urh' } }

      before { allow(described_class).to receive(:defaults).with(no_args).and_return(defaults) }

      it 'assigns default values' do
        map_settings = subject

        expect(map_settings.units).to eq(defaults[:units])
      end
    end
  end

  describe '.defaults' do
    subject { described_class.defaults }

    let(:defaults) { { units: 'urh' } }

    before do
      allow(YAML).to receive(:load_file).with("#{Rails.root}/config/defaults/map_settings.yml").and_return(defaults)
    end

    it { is_expected.to eq(defaults) }
  end

  describe '#update_settings' do
    subject { super().update_settings(settings_params) }

    let(:settings_params) do
      {
        base_map: {
          'wrong' => { selected: false },
          'correct' => { selected: true }
        },
        overlay_layers: {
          'correct' => { selected: true },
          'wrong' => { selected: false }
        },
        units: 'test_units'
      }
    end

    it 'updates map setings' do
      expect(map_settings).to receive(:update).with(base_map: 'correct', overlay_layers: ['correct'], units: 'test_units')

      subject
    end
  end
end
