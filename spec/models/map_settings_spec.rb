# frozen_string_literal: true

describe MapSettings, type: :model do
  subject { map_settings }

  let(:map_settings) { build_stubbed(:map_settings) }

  describe 'callbacks' do
    describe 'after_create' do
      subject { create(:map_settings, units: nil) }

      let(:defaults) { { units: 'urh' } }

      before do
        allow(YAML).to receive(:load_file).with("#{Rails.root}/config/defaults/map_settings.yml").and_return(defaults)
      end

      it 'assigns default values' do
        map_settings = subject

        expect(map_settings.units).to eq(defaults[:units])
      end
    end
  end
end
