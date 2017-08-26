class CreateBlocks < ActiveRecord::Migration[5.1]
  def change
    create_table :blocks do |t|
      t.string :name, null: false
      t.string :color, null: false
      t.integer :location, null: false
      t.belongs_to :list

      t.timestamps
    end
  end
end
