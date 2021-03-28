import { connect } from "react-redux";
import Loader from "../common/loader";
import Sidebar from "../sidebar/sidebar";
import MapBase from "./components/map_base";

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
          <Sidebar />
        </BlockUi>
      </div>
    )
  }
}

const mapStateToProps = ({ mainMap: { block } }) => ({
  mapBlock: block
});

export default connect(mapStateToProps)(MapIndex);
