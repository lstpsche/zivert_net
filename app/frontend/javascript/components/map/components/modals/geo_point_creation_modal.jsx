import { connect } from "react-redux";
import { hideGeoPointCreationModal } from "../../../../store/actions/geo_point_creation_modal";
import ModalWindow from "./modal_window";

class GeoPointCreationModal extends React.Component {
  render () {
    const { show, latitude, longitude, hideModal } = this.props;

    return (
      <ModalWindow
        show={show}
        title="title here"
        body={ "longitude = " + longitude + "; latitude = " + latitude }
        handleClose={hideModal}
      />
    )
  }
}

const mapStateToProps = ({ geoPointCreationModals: { show, latitude, longitude } }) => ({
  show, latitude, longitude
});

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideGeoPointCreationModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(GeoPointCreationModal);
