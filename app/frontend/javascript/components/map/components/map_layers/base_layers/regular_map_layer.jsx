import { TileLayer } from "react-leaflet";

class RegularMapLayer extends React.Component {
  render () {
    return (
      <TileLayer
        minZoom="3"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    )
  }
}

export default RegularMapLayer;
