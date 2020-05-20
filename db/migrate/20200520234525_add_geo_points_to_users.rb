class AddGeoPointsToUsers < ActiveRecord::Migration[5.2]
  def change
    change_table :geo_points do |t|
      t.belongs_to :user
    end
  end
end
