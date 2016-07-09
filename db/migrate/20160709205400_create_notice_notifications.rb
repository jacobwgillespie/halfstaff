class CreateNoticeNotifications < ActiveRecord::Migration[5.0]
  def change
    create_table :notice_notifications do |t|
      t.references :notice, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
