# frozen_string_literal: true

describe Users::UpdationJob, type: :job do
  describe '#perform' do
    subject { described_class.perform_now(user) }

    let(:user) { instance_double(User, json: user_json) }
    let(:user_json) { double(:user_json) }
    let(:action_cable_server) { double(:server) }

    before { allow(ActionCable).to receive(:server).with(no_args).and_return(action_cable_server) }

    it 'broadcasts user to creation channel' do
      expect(action_cable_server).to receive(:broadcast)
        .with('users_channel', action: 'update', user: user_json)

      subject
    end
  end
end
