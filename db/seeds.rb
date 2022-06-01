# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Minsk bounds
# west_longitude = 27.00679779052734
# east_longitude = 28.01959991455078
# south_latitude = 53.71052639598225
# north_latitude = 54.07349133491893
#
# start_date = (DateTime.now - 1.month).to_time.to_i
# end_date = (DateTime.now + 3.weeks).to_time.to_i
#
# user_id = User.find_by(username: 'lstpsche').id
#
# 10000.times do
#   longitude = Random.new.rand(west_longitude..east_longitude).to_s
#   latitude = Random.new.rand(south_latitude..north_latitude).to_s
#
#   value_max = Random.new.rand(30..100)
#   value_urh = Random.new.rand(0..value_max)
#
#   created_at = Time.at(Random.new.rand(start_date..end_date))
#
#   Measurement.create(
#     user_id: user_id,
#     longitude: longitude,
#     latitude: latitude,
#     value_urh: value_urh,
#     created_at: created_at
#   )
# end

# seed to create an admin (if doesn't exist already)

if User.where(admin: true).empty?
  User.create(
    first_name: 'Nikita',
    last_name: 'Silivonchik',
    username: 'lstpsche',
    nickname: 'lstpsche',
    admin: true,
    password: '1111',
    password_confirmation: '1111'
  )
end

# seeds for static measurements

stations_seeds = [
  { latitude: '53.20839722541924', longitude: '29.127137660980225', value_urh: 11, station_name: 'Бобруйск' },
  { latitude: '55.25285409335125', longitude: '30.24918079376221', value_urh: 10, station_name: 'Витебск' },
  { latitude: '54.89906909410509', longitude: '26.680984497070316', value_urh: 10, station_name: 'Нарочь, озерная' },
  { latitude: '53.46587604027148', longitude: '26.733169555664066', value_urh: 10, station_name: 'Столбцы' },
  { latitude: '55.048937281128296', longitude: '26.30689144134522', value_urh: 10, station_name: 'Лынтупы' },
  { latitude: '54.09999788503306', longitude: '26.516146659851078', value_urh: 10, station_name: 'Воложин' },
  { latitude: '54.432911051064906', longitude: '25.933141708374027', value_urh: 10, station_name: 'Ошмяны' },
  { latitude: '55.363429658762634', longitude: '27.456851005554203', value_urh: 10, station_name: 'Шарковщина' },
  { latitude: '53.8284077964928', longitude: '28.99776935577393', value_urh: 10, station_name: 'Березино' },
  { latitude: '55.8205731562555', longitude: '27.940163612365726', value_urh: 10, station_name: 'Верхнедвинск' },
  { latitude: '53.166533500950905', longitude: '24.44964408874512', value_urh: 10, station_name: 'Волковыск' },
  { latitude: '51.835008487689144', longitude: '24.260966777801517', value_urh: 10, station_name: 'Мокраны' },
  { latitude: '51.68812175609941', longitude: '23.967318534851078', value_urh: 10, station_name: 'Олтуш' },
  { latitude: '55.47451200238886', longitude: '28.75154256820679', value_urh: 10, station_name: 'Полоцк' },
  { latitude: '54.50276985678347', longitude: '30.443758964538578', value_urh: 10, station_name: 'Орша' },
  { latitude: '53.693886044259266', longitude: '30.369601249694828', value_urh: 13, station_name: 'Могилев' },
  { latitude: '53.92858377600672', longitude: '27.634241580963135', value_urh: 10, station_name: 'Минск' },
  { latitude: '54.02500326610776', longitude: '31.74156188964844', value_urh: 13, station_name: 'Мстиславль' },
  { latitude: '51.79660645527594', longitude: '30.24759292602539', value_urh: 47, station_name: 'Брагин' },
  { latitude: '54.303454032950086', longitude: '30.94333648681641', value_urh: 11, station_name: 'Горки' },
  { latitude: '52.56641240256924', longitude: '24.48208808898926', value_urh: 10, station_name: 'Пружаны' },
  { latitude: '54.265474718045915', longitude: '28.497676849365234', value_urh: 10, station_name: 'Борисов' },
  { latitude: '53.358440599845565', longitude: '32.06943511962891', value_urh: 10, station_name: 'Костюковичи' },
  { latitude: '51.83604270111873', longitude: '26.726002693176273', value_urh: 10, station_name: 'Верхний Теребежов' },
  { latitude: '54.80443240544176', longitude: '29.687483310699466', value_urh: 10, station_name: 'Сенно' },
  { latitude: '53.90221433541347', longitude: '25.323143005371097', value_urh: 10, station_name: 'Лида' },
  { latitude: '53.45113253500083', longitude: '31.003460884094242', value_urh: 20, station_name: 'Славгород' },
  { latitude: '53.05269359711468', longitude: '27.55229473114014', value_urh: 10, station_name: 'Слуцк' },
  { latitude: '54.48329072194943', longitude: '26.899960041046146', value_urh: 10, station_name: 'Вилейка' },
  { latitude: '52.71659089996599', longitude: '25.350404977798465', value_urh: 10, station_name: 'Ивацевичи' },
  { latitude: '52.19724381028852', longitude: '25.078268051147464', value_urh: 10, station_name: 'Дрогичин' },
  { latitude: '52.89417940934088', longitude: '30.04366993904114', value_urh: 12, station_name: 'Жлобин' },
  { latitude: '52.30004202371082', longitude: '26.666564941406254',
    value_urh: 10, station_name: 'Полесская, болотная' },
  { latitude: '52.366690595268174', longitude: '23.38328361511231', value_urh: 10, station_name: 'Высокое' },
  { latitude: '52.12236354682467', longitude: '26.112205982208252', value_urh: 10, station_name: 'Пинск' },
  { latitude: '53.13196773027052', longitude: '25.97180843353272', value_urh: 10, station_name: 'Барановичи' },
  { latitude: '52.11657955700596', longitude: '23.68560075759888', value_urh: 10, station_name: 'Брест' },
  { latitude: '52.40190829951071', longitude: '30.962991714477543', value_urh: 14, station_name: 'Гомель' },
  { latitude: '52.63324521267348', longitude: '28.883314132690433', value_urh: 10, station_name: 'Октябрь' },
  { latitude: '52.251648155903474', longitude: '29.840390682220463', value_urh: 11, station_name: 'Василевичи' },
  { latitude: '52.21383900747397', longitude: '27.869224548339847', value_urh: 11, station_name: 'Житковичи' },
  { latitude: '52.03628387406958', longitude: '29.19329166412354', value_urh: 11, station_name: 'Мозырь' }
]

stations_seeds.each do |seed|
  puts StaticMeasurement.create(
    user_id: User.where(admin: true).first.id,
    latitude: seed[:latitude],
    longitude: seed[:longitude],
    value_urh: seed[:value_urh],
    value_ush: nil,
    is_static: true,
    station_name: seed[:station_name]
  )
end
