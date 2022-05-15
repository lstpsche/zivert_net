# frozen_string_literal: true

class Measurement < MeasurementBase
  self.table_name = 'measurements'

  default_scope { where(is_static: false) }
end
