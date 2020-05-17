import { connect } from "react-redux";
import { setGeoPoints } from "../../store/actions/geo_points";
import fetchLink from "../../helpers/fetch_link";
import Loader from "../common/loader";
import MapBase from "./components/map_base";
import GeoPointCreationModal from "./components/modals/geo_point_creation_modal";

class MapIndex extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      mapBlocked: false,
      showCreationModal: false
    }
  }

  async toggleTableBlock (state) {
    this.setState({ mapBlocked: state });
  }

  toggleCreationModal (state) {
    this.setState({ showCreationModal: state });
  }

  componentDidMount () {
    this.toggleTableBlock(true);

    fetchLink({
      link: "/api/v1/map",
      onSuccess: (response) => {
        this.props.setGeoPoints(
          response.geoPoints.map(({ data: { attributes: { id, longitude, latitude, rad_value: radValue, comment } } }) => (
            { id, longitude, latitude, radValue, comment }
          ))
        );
      },
      onFailure: (error) => {
        // TODO: add parsing of internal server errors
        throw new Error(error);
      },
      onComplete: () => {
        this.toggleTableBlock(false);
      }
    });
  }

  render () {
    const { mapBlocked, showCreationModal } = this.state;
    const { geoPoints } = this.props;

    return (
      <div className="container map">
        <BlockUi tag="div" blocking={mapBlocked} loader={<Loader />} keepInView>
          <MapBase
            geoPoints={geoPoints}
            onDoubleClick={(args) => this.toggleCreationModal(true, args)}
          />

          <GeoPointCreationModal
            show={showCreationModal}
            onClose={(args) => this.toggleCreationModal(false, args)}
          />
        </BlockUi>
      </div>
    )
  }
}

const mapStateToProps = state => ({ geoPoints: state.geoPoints });

const mapDispatchToProps = dispatch => ({
  setGeoPoints: (geoPoints) => dispatch(setGeoPoints(geoPoints))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapIndex);
