class AddCommentToMeasurements < ActiveRecord::Migration[5.2]
  def change
    add_column :measurements, :comment, :string, null: false, default: ''
  end
end
