import fetchLink from "../../../../../helpers/fetch_link";
import MeasurementRowInfo from "./measurement_row_info";

class MeasurementRow extends React.Component {
  constructor(props) {
    super(props);

    this.onRemove = this.onRemove.bind(this);
  }

  onRemove () {
    const { measurement: { id } } = this.props;

    fetchLink({
      link: "/api/v1/measurements/" + id,
      method: "DELETE",
      onSuccess: ({ success, errors }) => {
        if (!success) {
          // TODO: add errors handling with alertify or smth
          console.log("Could not remove.");
          console.log(errors);
        }
      },
      onFailure: (error) => {
        // TODO: add errors handling with alertify or smth
        console.log("Internal server error.");
        console.log(error);
      }
    });
  }

  render () {
    const { measurement } = this.props;

    return (
      <div className="measurement-row-container">
        <div className="measurement-connector-line" />
        <MeasurementRowInfo
          measurement={measurement}
          onRemoveCallback={this.onRemove}
        />
      </div>
    )
  }
}

MeasurementRow.propTypes = {
  measurement: PropTypes.object.isRequired
}

export default MeasurementRow;
