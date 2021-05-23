import { ActionCableConsumer } from "react-actioncable-provider";
import { Fragment } from "react";

class BaseChannel extends React.Component {
  handleReceived (actions, data) {
    actions[data.action].forEach(callback => callback(data));
  }

  renderConsumers (channel) {
    return (
      <ActionCableConsumer
        channel={{ channel: channel.name }}
        onReceived={(data) => this.handleReceived(channel.onReceiveActions, data)}
      />
    )
  }

  render () {
    return (
      <Fragment>
        { this.renderConsumers(this.channel) }
      </Fragment>
    )
  }
}

export default BaseChannel;
