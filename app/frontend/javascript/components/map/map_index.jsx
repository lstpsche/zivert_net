import { connect } from "react-redux";
import { setGeoPoints } from "../../store/actions/geo_points";
import { showGeoPointCreationModal } from "../../store/actions/geo_point_creation_modal";
import fetchLink from "../../helpers/fetch_link";
import Loader from "../common/loader";
import MapBase from "./components/map_base";
import GeoPointCreationModal from "./components/modals/geo_point_creation_modal";

class MapIndex extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      mapBlocked: false
    }

    this.showCreationModal = this.showCreationModal.bind(this);
  }

  async toggleTableBlock (state) {
    this.setState({ mapBlocked: state });
  }

  showCreationModal ({ lat: latitude, lng: longitude }) {
    this.props.showCreationModal({ latitude, longitude });
  }

  componentDidMount () {
    this.toggleTableBlock(true);

    fetchLink({
      link: "/api/v1/map",
      onSuccess: (response) => {
        this.props.setGeoPoints(
          response.geoPoints.map(({ data: { attributes: { id, user_id: userId, longitude, latitude, rad_value: radValue, comment } } }) => (
            { id, userId, longitude, latitude, radValue, comment }
          ))
        );
      },
      onFailure: (error) => {
        // TODO: add parsing of internal server errors
        throw new Error(error);
      },
      onComplete: () => this.toggleTableBlock(false)
    });
  }

  render () {
    const { mapBlocked } = this.state;
    const { geoPoints, currentUserId } = this.props;

    return (
      <div className="container map">
        <BlockUi
          tag="div"
          className="full-page-cover"
          blocking={mapBlocked}
          loader={<Loader />}
          message={<div className="loader-message">{ I18n.t("common.screen_block.loading_geo_points") }</div>}
          keepInView
        >
          <MapBase
            markers={geoPoints}
            currentUserId={currentUserId}
            onDoubleClick={this.showCreationModal}
          />

          <GeoPointCreationModal />
        </BlockUi>
      </div>
    )
  }
}

const mapStateToProps = ({ geoPoints, currentUser: { id: currentUserId } }) => ({ geoPoints, currentUserId });

const mapDispatchToProps = dispatch => ({
  setGeoPoints: (geoPoints) => dispatch(setGeoPoints(geoPoints)),
  showCreationModal: (latlng) => dispatch(showGeoPointCreationModal(latlng))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapIndex);
