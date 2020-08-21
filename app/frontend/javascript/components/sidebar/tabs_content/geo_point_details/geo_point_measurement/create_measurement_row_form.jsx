import fetchLink from "../../../../../helpers/fetch_link";
import { AiOutlineSend } from "react-icons/ai";
import { MdSend } from "react-icons/md";
import TextareaAutosize from "react-autosize-textarea";

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
    if (!this.isInputCorrect(name, value))
      return;

    this.setState({ [name]: value });
  }

  handleSubmit () {
    this.submitForm();
  }

  isInputCorrect (fieldName, value) {
    if (fieldName === "value") {
      if (value.length === 0)
        return true;

      if (value.length > 3 || !/^\d+$/.test(value))
        return false;
    }

    return true;
  }

  isSendButtonDisabled () {
    const { value } = this.state;

    return value.length === 0;
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
          <TextareaAutosize
            maxRows={3}
            name="comment"
            className="measurement-comment"
            placeholder="Any comment here (time, etc.)"
            value={comment}
            onChange={this.handleInputChange}
          />
        </div>

        <button
          className="measurement-submit create"
          disabled={this.isSendButtonDisabled()}
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
