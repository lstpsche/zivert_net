# frozen_string_literal: true

class MeasurementsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'measurements_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
