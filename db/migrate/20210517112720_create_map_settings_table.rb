class CreateMapSettingsTable < ActiveRecord::Migration[5.2]
  def up
    create_table :map_settings do |t|
      t.string :units, null: false
      t.belongs_to :user

      t.timestamps
    end

    add_reference :users, :map_settings

    assign_default_map_settings_to_users
  end

  def down
    drop_table :map_settings
    remove_reference :users, :map_settings
  end

  private

  class UserTemp < ActiveRecord::Base
    self.table_name = 'users'
  end

  class MapSettingsTemp < ActiveRecord::Base
    self.table_name = 'map_settings'
  end

  def assign_default_map_settings_to_users
    defaults = OpenStruct.new(YAML.load_file("#{Rails.root}/config/defaults/map_settings.yml"))

    UserTemp.all.map do |user|
      MapSettingsTemp.create(defaults.to_h.merge(user_id: user.id))
    end
  end
end
