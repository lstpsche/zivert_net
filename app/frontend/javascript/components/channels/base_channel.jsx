import { ActionCableConsumer } from "react-actioncable-provider";
import { Fragment } from "react";

class BaseChannel extends React.Component {
  handleReceived (actions, { data: { attributes: measurement } }) {
    actions.each(action => action(measurement));
  }

  renderConsumers (channels) {
    return (
      channels.map (channel => {
        return (
          <ActionCableConsumer
            key={"channel-" + channel.name}
            channel={{ channel: channel.name }}
            onReceived={(data) => this.handleReceived(channel.onReceiveActions, data)}
          />
        )
      })
    )
  }

  render () {
    return (
      <Fragment>
        { this.renderConsumers(this.channels) }
      </Fragment>
    )
  }
}

export default BaseChannel;
