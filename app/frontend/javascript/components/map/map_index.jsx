import { connect } from "react-redux";
import Loader from "../common/loader";
import MapBase from "./components/map_base";
import GeoPointCreationModal from "./components/modals/geo_point_creation_modal";

class MapIndex extends React.Component {
  render () {
    const { mapBlock: { state: mapBlocked, blockMessage }, showCreationModal, pointLatitude, pointLongitude } = this.props;

    return (
      <div className="container map">
        <BlockUi
          tag="div"
          id="full-map-loader"
          className="full-page-cover"
          blocking={mapBlocked}
          loader={<Loader />}
          message={<div className="loader-message">{ blockMessage }</div>}
          keepInView
        >
          <MapBase />

          {
            showCreationModal
            ? <GeoPointCreationModal latitude={pointLatitude} longitude={pointLongitude} />
            : ""
          }
        </BlockUi>
      </div>
    )
  }
}

const mapStateToProps = ({ geoPointCreationModal: { show, latitude, longitude }, mainMap: { block } }) => ({
  mapBlock: block,
  showCreationModal: show,
  pointLatitude: latitude,
  pointLongitude: longitude
});

export default connect(mapStateToProps)(MapIndex);
