# frozen_string_literal: true

module Authentication
  class PasswordNotValid < StandardError
    def initialize(msg = 'Password not valid', exception_type = 'password_not_valid')
      @exception_type = exception_type
      super(msg)
    end
  end
end
