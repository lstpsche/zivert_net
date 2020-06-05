import { connect } from "react-redux";
import { Fragment } from "react";
import { ActionCableConsumer } from "react-actioncable-provider";
import { addGeoPoint, updateGeoPoint, removeGeoPoint } from "../../store/actions/geo_points";

class GeoPointsChannel extends React.Component {
  constructor (props) {
    super(props);

    this.actions = {
      create: this.props.addGeoPoint,
      update: this.props.updateGeoPoint,
      delete: this.props.removeGeoPoint
    }

    this.handleReceived = this.handleReceived.bind(this);
  }

  handleReceived (action, { data: { attributes: geoPoint } }) {
    this.actions[action](geoPoint);
  }

  render () {
    return (
      <Fragment>
        <ActionCableConsumer
          channel={{ channel: "GeoPoints::CreationChannel" }}
          onReceived={({ geoPoint }) => this.handleReceived("create", geoPoint)}
        />
        <ActionCableConsumer
          channel={{ channel: "GeoPoints::UpdationChannel" }}
          onReceived={({ geoPoint }) => this.handleReceived("update", geoPoint)}
        />
        <ActionCableConsumer
          channel={{ channel: "GeoPoints::DeletionChannel" }}
          onReceived={({ geoPoint }) => this.handleReceived("delete", geoPoint)}
        />
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addGeoPoint: (geoPoint) => dispatch(addGeoPoint(geoPoint)),
  updateGeoPoint: (geoPoint) => dispatch(updateGeoPoint(geoPoint)),
  removeGeoPoint: (geoPoint) => dispatch(removeGeoPoint(geoPoint))
});

export default connect(undefined, mapDispatchToProps)(GeoPointsChannel);
