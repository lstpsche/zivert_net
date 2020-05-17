import Popup from "react-leaflet-editable-popup";

class MarkerPopup extends React.Component {
  renderText () {
    const { text } = this.props;

    if (!text)
      return "";

    return (
      <div className="popup-text">
        {text}
      </div>
    )
  }

  render () {
    const { removalCallback } = this.props;

    return (
      <Popup
        className="marker-popup marker-comment"
        closeButton={false}
        removable
        nametag={I18n.t("common.geo_point")}
        removalCallback={removalCallback}
      >
        { this.renderText() }
      </Popup>
    )
  }
}

MarkerPopup.propTypes = {
  text: PropTypes.string,
  removalCallback: PropTypes.func
}

MarkerPopup.defaultProps = {
  text: "",
  removalCallback: () => {}
}

export default MarkerPopup;
