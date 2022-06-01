import { connect } from "react-redux";
import toast from "react-hot-toast";
import CurrentLocationControl from "react-leaflet-current-location-control";

class LocationControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toastId: undefined,
      positionFound: false
    }

    this.onPositionFound = this.onPositionFound.bind(this);
    this.onPositionStart = this.onPositionStart.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    this.onPositionStop = this.onPositionStop.bind(this);
  }

  dismissToast () {
    const { toastId } = this.state;

    if (toastId) toast.dismiss();
  }

  onPositionFound (position) {
    const { positionFound } = this.state;

    if (positionFound) return;

    const { coords: { latitude, longitude } } = position;
    const { mapRef } = this.props;

    this.dismissToast();
    toast.success("Position found");
    mapRef.setView([latitude, longitude], 13, { animate: true });
    this.setState({ positionFound: true });
  }

  onPositionStart () {
    let toastId = toast.loading("Finding your position...");

    this.setState({ toastId });
  }

  onPositionStop () {
    this.dismissToast();
    this.setState({ positionFound: false });
  }

  render () {
    return (
      <CurrentLocationControl
        position="topleft"
        geoLocationOptions={{enableHighAccuracy: true}}
        onPosition={this.onPositionFound}
        onPositionStart={this.onPositionStart}
        onPositionStop={this.onPositionStop}
      />
    )
  }
}

const mapStateToProps = ({
  mainMap: { ref }
}) => ({
  mapRef: ref
})

export default connect(mapStateToProps)(LocationControl);
