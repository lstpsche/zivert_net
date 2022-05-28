import { TileLayer } from "react-leaflet";

class TemperatureMapLayer extends React.Component {
  render () {
    return (
      <TileLayer
        minZoom="3"
        url="https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=a0ba4f8f10150c66dfdb34b5989afb39"
      />
    )
  }
}

export default TemperatureMapLayer;
