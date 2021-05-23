# frozen_string_literal: true

module Authentication
  class UsernameNotUnique < StandardError
    def initialize(msg = 'Username not unique', exception_type = 'username_not_unique')
      @exception_type = exception_type
      super(msg)
    end
  end
end
