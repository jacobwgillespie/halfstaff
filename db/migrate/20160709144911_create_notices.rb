class CreateNotices < ActiveRecord::Migration[5.0]
  def change
    create_table :notices do |t|
      t.string :title
      t.string :body, array: true
      t.string :summary
      t.string :html
      t.string :url
      t.date :posted_date
      t.date :start_date
      t.date :end_date
      t.string :end_time
      t.string :scope
      t.string :notice_type
      t.string :slug
      t.string :hashid

      t.timestamps
    end
    add_index :notices, :start_date
    add_index :notices, :end_date
    add_index :notices, :scope
    add_index :notices, :slug, unique: true
    add_index :notices, :hashid
  end
end
