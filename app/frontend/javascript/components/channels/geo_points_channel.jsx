import { connect } from "react-redux";
import { addGeoPoint, updateGeoPoint, removeGeoPoint } from "../../store/actions/geo_points";
import BaseChannel from "./base_channel";

class GeoPointsChannel extends BaseChannel {
  constructor (props) {
    super(props);

    const { addGeoPoint, updateGeoPoint, removeGeoPoint } = this.props;

    this.channel = {
      name: "GeoPointsChannel",
      onReceiveActions: {
        create: [addGeoPoint],
        update: [updateGeoPoint],
        delete: [removeGeoPoint]
      }
    };
  }
}

const mapDispatchToProps = dispatch => ({
  addGeoPoint: ({ geoPoint }) => dispatch(addGeoPoint(geoPoint.data)),
  updateGeoPoint: ({ geoPoint }) => dispatch(updateGeoPoint(geoPoint.data)),
  removeGeoPoint: ({ geoPoint }) => dispatch(removeGeoPoint(geoPoint.data))
});

export default connect(undefined, mapDispatchToProps)(GeoPointsChannel);
