class CreateMeasurements < ActiveRecord::Migration[5.2]
  def change
    create_table :measurements do |t|
      t.float :value, default: 0.0, null: false
      t.belongs_to :geo_point
      t.belongs_to :user

      t.timestamps
    end
  end
end
