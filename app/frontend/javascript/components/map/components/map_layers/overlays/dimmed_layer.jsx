import { Polygon, LayerGroup } from "react-leaflet";
import { LatLngBounds, LatLng } from "leaflet";

// Do not touch it. Please.
class DimmedLayer extends React.Component {
  render () {
    const outerBounds = new LatLngBounds([-1000, -100000], [1000, 100000])
    const outerBoundsLatLngs = [
      outerBounds.getSouthWest(),
      outerBounds.getNorthWest(),
      outerBounds.getNorthEast(),
      outerBounds.getSouthEast()
    ]

    return (
      <LayerGroup>
        <Polygon
          stroke={false}
          color="#333"
          fillOpacity="0.5"
          interactive={false}
          smoothFactor="100"
          positions={[outerBoundsLatLngs, [new LatLng(0, 0)]]}
        />
      </LayerGroup>
    )
  }
}

export default DimmedLayer;
