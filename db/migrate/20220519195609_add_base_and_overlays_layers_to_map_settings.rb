class AddBaseAndOverlaysLayersToMapSettings < ActiveRecord::Migration[5.2]
  def change
    change_table :map_settings do |t|
      t.string :base_map, default: 'regularMap', null: false
      t.string :overlay_layers, array: true, default: ['measurements'], null: false
    end
  end
end
