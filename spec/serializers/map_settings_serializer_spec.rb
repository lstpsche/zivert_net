# frozen_string_literal: true

describe MapSettingsSerializer do
  let!(:map_settings) { create(:map_settings) }

  describe 'attributes' do
    subject { described_class.new(map_settings).serializable_hash }

    it 'serializes map_settings', :aggregate_failures do
      result_json = subject[:data][:attributes]

      expect(result_json[:id]).to eq(map_settings.id)
      expect(result_json[:user_id]).to eq(map_settings.user_id)
      expect(result_json[:units]).to eq(map_settings.units)
    end
  end
end
