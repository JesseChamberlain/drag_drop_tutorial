class CreateBlocks < ActiveRecord::Migration[5.0]
  def change
    create_table :blocks do |t|
      t.string :name, null: false
      t.string :color, null: false
      t.integer :location, null: false

      t.timestamps
    end
  end
end
