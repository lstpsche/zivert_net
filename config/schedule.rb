# Use this file to easily define all of your cron jobs.
#
# It's helpful, but not entirely necessary to understand cron before proceeding.
# http://en.wikipedia.org/wiki/Cron

# Example:
#
# set :output, "/path/to/my/cron_log.log"
#
# every 2.hours do
#   command "/usr/bin/some_great_command"
#   runner "MyModel.some_method"
#   rake "some:great:rake:task"
# end
#
# every 4.days do
#   runner "AnotherModel.prune_old_records"
# end
#
#
# NOTE: to run scheduled jobs locally run commands:
# crontab -r                                                  # clear current cron schedule
# whenever --update-crontab --set environment='development'   # update cron schedule

every 1.day, at: ['12:00 am', '9:00 am'] do
  rake 'measurements:update_stations_rad_data'
end

# Learn more: http://github.com/javan/whenever
