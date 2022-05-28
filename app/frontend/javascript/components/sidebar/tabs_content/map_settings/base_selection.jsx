import { Form } from "react-bootstrap";

class BaseSelection extends React.Component {
  isChecked (name) {
    return this.state[name].selected
  }

  onRadioChange (selectedLayer) {
    let layers = this.state;
    Object.keys(layers).map(name =>
      layers[name].selected = (name === selectedLayer)
    );

    this.setState({ ...layers });
  }

  renderSectionLabel (text) {
    return (
      <h5 className="map-settings-section-header">{ text }</h5>
    )
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
