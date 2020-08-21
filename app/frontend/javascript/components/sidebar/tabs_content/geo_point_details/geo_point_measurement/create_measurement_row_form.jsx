import fetchLink from "../../../../../helpers/fetch_link";
import { AiOutlineSend } from "react-icons/ai";
import { MdSend } from "react-icons/md";

class CreateMeasurementRowForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      value: "",
      comment: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange ({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit () {
    // TODO: add fields (value) presence validation here
    this.submitForm();
  }

  submitForm () {
    const { value, comment } = this.state;
    const { geoPointId, onCreate } = this.props;

    fetchLink({
      link: "/api/v1/measurements",
      method: "POST",
      body: JSON.stringify({ measurement: { value, geo_point_id: geoPointId, comment } }),
      onSuccess: ({ success, errors }) => {
        if (success) {
          onCreate();
        } else {
          // TODO: add errors handling with alertify or smth
          console.log(errors);
        }
      }
    });
  }

  componentDidMount () {
    this.valueInput.focus();
  }

  render () {
    const { value, comment } = this.state;

    return (
      <div className="measurement-row create-form">
        <div className="measurement-value-container">
          <input
            ref={el => this.valueInput = el}
            type="text"
            name="value"
            className="measurement-value"
            value={value}
            onChange={this.handleInputChange}
          />
        </div>

        <div className="measurement-details">
          <div className="measurement-author-info"> Author name (current user name here) </div>
          <input
            type="text"
            name="comment"
            className="measurement-comment"
            placeholder="Any comment here (time, etc.)"
            value={comment}
            onChange={this.handleInputChange}
          />
        </div>

        <button
          className="measurement-submit create"
          onClick={this.handleSubmit}
        >
          <MdSend size="20px" />
        </button>
      </div>
    )
  }
}

CreateMeasurementRowForm.propTypes = {
  geoPointId: PropTypes.number.isRequired,
  onCreate: PropTypes.func
}

export default CreateMeasurementRowForm;
