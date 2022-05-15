# frozen_string_literal: true

class StaticMeasurementsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'static_measurements_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
