import Popup from "react-leaflet-editable-popup";

class MarkerPopup extends React.Component {
  renderSpace () {
    const { text, markerRemovable } = this.props;

    if (!text.length || !markerRemovable)
      return "";

    return <div className="space-between"></div>
  }

  renderContent () {
    const { text } = this.props;

    if (!text)
      return this.renderSpace();

    return (
      <div className="popup-content">
        <div className="popup-text">
          {text}
        </div>
        { this.renderSpace() }
      </div>
    )
  }

  render () {
    const { removalCallback, markerRemovable } = this.props;

    return (
      <Popup
        className="marker-popup marker-comment"
        closeButton={false}
        removable={markerRemovable}
        nametag={I18n.t("common.geo_point")}
        removalCallback={removalCallback}
      >
        { this.renderContent() }
      </Popup>
    )
  }
}

MarkerPopup.propTypes = {
  text: PropTypes.string,
  markerRemovable: PropTypes.bool,
  removalCallback: PropTypes.func
}

MarkerPopup.defaultProps = {
  text: "",
  markerRemovable: false,
  removalCallback: () => {}
}

export default MarkerPopup;
