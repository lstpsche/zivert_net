# frozen_string_literal: true

class StaticMeasurement < MeasurementBase
  self.table_name = 'measurements'

  has_one :weather_data, dependent: :destroy

  default_scope { where(is_static: true).order(created_at: :desc) }

  after_create :create_weather_data

  REJECTED_ATTRIBUTES = %w[id created_at updated_at value_urh is_static].freeze

  class << self
    def latest_measurements
      # that's a crunch bc there's no good (and fast) sql method for getting unique records by column
      first(100).uniq(&:station_name)
    end
  end

  # incoming value SHOULD be in USH and int or float
  def update_value(new_value_ush)
    self.class.create(new_station_attributes(new_value_ush))
  end

  private

  def new_station_attributes(new_value_ush)
    attributes
      .except(*REJECTED_ATTRIBUTES)
      .merge('value_ush' => new_value_ush)
  end

  def create_weather_data
    CreateWeatherDataForMeasurement.new(self).execute
  end
end
