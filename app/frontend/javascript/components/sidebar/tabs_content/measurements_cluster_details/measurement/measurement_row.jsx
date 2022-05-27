import { connect } from "react-redux";
import MeasurementRowInfo from "./measurement_row_info";
import { selectStaticMeasurement } from "../../../../../store/actions/static_measurements";
import { showSidebar } from "../../../../../store/actions/sidebar";

class MeasurementRow extends React.Component {
  constructor (props) {
    super(props);

    this.handleRowClick = this.handleRowClick.bind(this);
  }

  handleRowClick () {
    const {
      selectStaticMeasurement, showStaticMeasurementSidebar,
      measurement: { id, isStatic, latitude, longitude }, mapRef
    } = this.props;

    if (isStatic) {
      selectStaticMeasurement(id);
      mapRef.setView([latitude, longitude], 12, { animate: true });
      showStaticMeasurementSidebar();
    }
  }

  render () {
    const { measurement } = this.props;

    return (
      <div className="measurement-row-container">
        <div className="measurement-connector-line" />
        <MeasurementRowInfo
          measurement={measurement}
          clickEvent={() => this.handleRowClick()}
        />
      </div>
    )
  }
}

MeasurementRow.propTypes = {
  measurement: PropTypes.object.isRequired
}

const mapStateToProps = ({
  mainMap: { ref }
}) => ({
  mapRef: ref
})

const mapDispatchToProps = dispatch => ({
  selectStaticMeasurement: (id) => dispatch(selectStaticMeasurement({ id })),
  showStaticMeasurementSidebar: () => dispatch(showSidebar({ selectedTabId: "station-measurement-details-tab" }))
})

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementRow);
