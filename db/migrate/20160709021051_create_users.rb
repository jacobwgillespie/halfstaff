class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :phone
      t.string :token
      t.datetime :token_generated_at
      t.datetime :last_texted_about_login_at
      t.boolean :active
      t.datetime :expires_at

      t.timestamps
    end
    add_index :users, :phone, unique: true
    add_index :users, :token
    add_index :users, :active
  end
end
