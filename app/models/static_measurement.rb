# frozen_string_literal: true

class StaticMeasurement < MeasurementBase
  self.table_name = 'measurements'

  default_scope { where(is_static: true).order(created_at: :desc) }

  REJECTED_ATTRIBUTES = %w[id created_at updated_at value_ush is_static].freeze

  class << self
    def latest_measurements
      # that's a crunch bc there's no good (and fast) sql method for getting unique records by column
      first(100).uniq(&:station_name)
    end
  end

  # incoming value SHOULD be in urh and int or float
  def update_value(new_value_urh)
    self.class.create(new_station_attributes(new_value_urh))
  end

  private

  def new_station_attributes(new_value_urh)
    attributes
      .except(*REJECTED_ATTRIBUTES)
      .merge('value_urh' => new_value_urh)
  end
end
