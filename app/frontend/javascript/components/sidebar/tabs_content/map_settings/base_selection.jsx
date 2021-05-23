import { Form } from "react-bootstrap";

class BaseSelection extends React.Component {
  isChecked (name) {
    const { layers } = this.props;

    return layers[name].selected
  }

  render () {
    return (
      <Form className="map-settings-section">
        { this.renderSectionLabel() }

        <div className="map-settings-section-body">
          { this.renderSectionBody() }
        </div>
      </Form>
    )
  }
}

export default BaseSelection;
