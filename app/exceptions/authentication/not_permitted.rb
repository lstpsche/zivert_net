# frozen_string_literal: true

module Authentication
  class NotPermitted < StandardError
    def initialize(msg = 'Not permitted', exception_type = 'not_permitted')
      @exception_type = exception_type
      super(msg)
    end
  end
end
