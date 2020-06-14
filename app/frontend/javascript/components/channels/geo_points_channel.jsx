import { connect } from "react-redux";
import { addGeoPoint, updateGeoPoint, removeGeoPoint } from "../../store/actions/geo_points";
import BaseChannel from "./base_channel";

class GeoPointsChannel extends BaseChannel {
  constructor (props) {
    super(props);

    const { addGeoPoint, updateGeoPoint, removeGeoPoint } = this.props;

    this.channels = [
      { name: "GeoPoints::CreationChannel", actionName: "create", onReceiveActions: [addGeoPoint] },
      { name: "GeoPoints::UpdationChannel", actionName: "update", onReceiveActions: [updateGeoPoint] },
      { name: "GeoPoints::DeletionChannel", actionName: "delete", onReceiveActions: [removeGeoPoint] }
    ];
  }
}

const mapDispatchToProps = dispatch => ({
  addGeoPoint: (geoPoint) => dispatch(addGeoPoint(geoPoint)),
  updateGeoPoint: (geoPoint) => dispatch(updateGeoPoint(geoPoint)),
  removeGeoPoint: (geoPoint) => dispatch(removeGeoPoint(geoPoint))
});

export default connect(undefined, mapDispatchToProps)(GeoPointsChannel);
