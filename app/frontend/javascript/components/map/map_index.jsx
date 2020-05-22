import { connect } from "react-redux";
import Loader from "../common/loader";
import MapBase from "./components/map_base";
import GeoPointCreationModal from "./components/modals/geo_point_creation_modal";

class MapIndex extends React.Component {
  render () {
    const { mapBlock: { state: mapBlocked, blockMessage } } = this.props;

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

          <GeoPointCreationModal />
        </BlockUi>
      </div>
    )
  }
}

const mapStateToProps = ({ mainMap: { block } }) => ({ mapBlock: block });

export default connect(mapStateToProps)(MapIndex);
