import { Popup } from "react-leaflet";

class MarkerPopup extends React.Component {
  render () {
    const { text } = this.props;

    return (
      <Popup
        className="marker-comment"
        closeButton={false}
      >
        {text}
      </Popup>
    )
  }
}

MarkerPopup.propTypes = {
  text: PropTypes.string.isRequired
}

export default MarkerPopup;
