import CreateMeasurementRowForm from "./create_measurement_row_form";
import { FaPlus } from "react-icons/fa";

class CreateMeasurementRow extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      showForm: false
    }

    this.onCreate = this.onCreate.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  showForm () {
    this.setState({ showForm: true }, () => {
      document.addEventListener("click", this.hideForm);
    });
  }

  hideForm (event) {
    if (event === undefined || !this.formRow.contains(event.target))
      this.setState({ showForm: false }, () => {
        document.removeEventListener("click", this.hideForm);
      });
  }

  onCreate () {
    this.hideForm();
  }

  renderConnectorLine () {
    return <div className="measurement-connector-line create" />
  }

  renderCreateForm() {
    const { geoPointId } = this.props;

    return (
      <div
        id="create-measurement-form-row"
        ref={el => this.formRow = el}
      >
        { this.renderConnectorLine() }
        <CreateMeasurementRowForm
          onCreate={this.onCreate}
          geoPointId={geoPointId}
        />
      </div>
    )
  }

  renderCreateButton () {
    return (
      <div id="create-measurement-btn-row">
        { this.renderConnectorLine() }
        <div
          className="create-measurement-btn"
          onClick={this.showForm}
        >
          <FaPlus size="20px" />
        </div>
      </div>
    )
  }

  render () {
    const { showForm } = this.state;

    return (
      <div
        id="create-measurement-row"
        className="measurement-row-container create"
      >
        {
          showForm
          ? this.renderCreateForm()
          : this.renderCreateButton()
        }
      </div>
    )
  }
}

CreateMeasurementRow.propTypes = {
  geoPointId: PropTypes.number.isRequired
}

export default CreateMeasurementRow;
