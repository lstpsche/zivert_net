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

ActiveRecord::Schema.define(version: 2022_05_19_195609) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "map_settings", force: :cascade do |t|
    t.string "units", null: false
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "base_map", default: "regularMap", null: false
    t.string "overlay_layers", default: ["measurements"], null: false, array: true
    t.index ["user_id"], name: "index_map_settings_on_user_id"
  end

  create_table "measurements", force: :cascade do |t|
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "latitude", default: "0.0", null: false
    t.string "longitude", default: "0.0", null: false
    t.float "value_urh"
    t.float "value_ush"
    t.boolean "is_static", default: false, null: false
    t.string "station_name"
    t.bigint "weather_data_id"
    t.index ["user_id"], name: "index_measurements_on_user_id"
    t.index ["weather_data_id"], name: "index_measurements_on_weather_data_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "nickname", null: false
    t.boolean "admin", default: false, null: false
    t.bigint "map_settings_id"
    t.index ["map_settings_id"], name: "index_users_on_map_settings_id"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "weather_data", force: :cascade do |t|
    t.integer "temperature"
    t.integer "pressure_mm"
    t.integer "pressure_pa"
    t.string "condition"
    t.integer "cloudness"
    t.integer "precipitation_type"
    t.integer "precipitation_strength"
    t.boolean "is_thunder"
    t.integer "wind_speed"
    t.string "wind_direction"
    t.integer "humidity"
    t.bigint "static_measurement_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["static_measurement_id"], name: "index_weather_data_on_static_measurement_id"
  end

end
