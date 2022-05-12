# frozen_string_literal: true

namespace :measurements do
  desc 'Fetches latest Belhydromet radiation data and applies it to corresponding StaticMeasurements'
  task update_stations_rad_data: :environment do
    rad_data = FetchBelhydrometRadData.new.execute

    rad_data.each do |station_name, rad_value|
      StaticMeasurement.find_by(station_name: station_name)&.update_value(rad_value)
    end
  end
end
