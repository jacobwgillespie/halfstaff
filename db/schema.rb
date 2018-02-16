# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160710143825) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "notice_notifications", id: :serial, force: :cascade do |t|
    t.integer "notice_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["notice_id"], name: "index_notice_notifications_on_notice_id"
    t.index ["user_id"], name: "index_notice_notifications_on_user_id"
  end

  create_table "notices", id: :serial, force: :cascade do |t|
    t.string "title"
    t.string "body", array: true
    t.string "summary"
    t.string "html"
    t.string "url"
    t.date "posted_date"
    t.date "start_date"
    t.date "end_date"
    t.string "end_time"
    t.string "scope"
    t.string "notice_type"
    t.string "slug"
    t.string "hashid"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["end_date"], name: "index_notices_on_end_date"
    t.index ["hashid"], name: "index_notices_on_hashid"
    t.index ["scope"], name: "index_notices_on_scope"
    t.index ["slug"], name: "index_notices_on_slug", unique: true
    t.index ["start_date"], name: "index_notices_on_start_date"
  end

  create_table "payments", id: :serial, force: :cascade do |t|
    t.string "customer_id"
    t.string "charge_id"
    t.string "email"
    t.integer "years"
    t.integer "amount"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["charge_id"], name: "index_payments_on_charge_id"
    t.index ["customer_id"], name: "index_payments_on_customer_id"
    t.index ["email"], name: "index_payments_on_email"
    t.index ["user_id"], name: "index_payments_on_user_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "phone"
    t.string "token"
    t.datetime "token_generated_at"
    t.datetime "last_texted_about_login_at"
    t.boolean "active"
    t.datetime "expires_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["active"], name: "index_users_on_active"
    t.index ["phone"], name: "index_users_on_phone", unique: true
    t.index ["token"], name: "index_users_on_token"
  end

  add_foreign_key "notice_notifications", "notices"
  add_foreign_key "notice_notifications", "users"
  add_foreign_key "payments", "users"
end
