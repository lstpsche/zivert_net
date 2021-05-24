# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Minsk bounds
west_longitude = 27.00679779052734
east_longitude = 28.01959991455078
south_latitude = 53.71052639598225
north_latitude = 54.07349133491893

start_date = (DateTime.now - 1.month).to_time.to_i
end_date = (DateTime.now + 3.weeks).to_time.to_i

user_id = User.find_by(username: 'lstpsche').id

10000.times do
  longitude = Random.new.rand(west_longitude..east_longitude).to_s
  latitude = Random.new.rand(south_latitude..north_latitude).to_s

  value_max = Random.new.rand(30..100)
  value_urh = Random.new.rand(0..value_max)

  created_at = Time.at(Random.new.rand(start_date..end_date))

  Measurement.create(
    user_id: user_id,
    longitude: longitude,
    latitude: latitude,
    value_urh: value_urh,
    created_at: created_at
  )
end
