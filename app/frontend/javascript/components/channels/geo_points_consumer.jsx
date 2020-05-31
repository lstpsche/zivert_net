import { connect } from "react-redux";
import { ActionCableConsumer } from "react-actioncable-provider";
import { addGeoPoint, updateGeoPoint, removeGeoPoint } from "../../store/actions/geo_points";

class GeoPointsConsumer extends React.Component {
  constructor (props) {
    super(props);

    this.actions = {
      create: this.props.addGeoPoint,
      update: this.props.updateGeoPoint,
      destroy: this.props.removeGeoPoint
    }

    this.handleReceived = this.handleReceived.bind(this);
  }

  handleReceived ({ action, geoPoint: { data: { attributes: geoPoint } } }) {
    this.actions[action](geoPoint);
  }

  render () {
    return (
      <ActionCableConsumer
        channel={{ channel: "GeoPointsChannel" }}
        onReceived={this.handleReceived}
      />
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addGeoPoint: (geoPoint) => dispatch(addGeoPoint(geoPoint)),
  updateGeoPoint: (geoPoint) => dispatch(updateGeoPoint(geoPoint)),
  removeGeoPoint: (geoPoint) => dispatch(removeGeoPoint(geoPoint))
});

export default connect(undefined, mapDispatchToProps)(GeoPointsConsumer);
