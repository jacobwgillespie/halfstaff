class CreatePayments < ActiveRecord::Migration[5.0]
  def change
    create_table :payments do |t|
      t.string :customer_id
      t.string :charge_id
      t.string :email
      t.integer :years
      t.integer :amount
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :payments, :customer_id
    add_index :payments, :charge_id
    add_index :payments, :email
  end
end
