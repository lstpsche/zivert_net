class GeigerCounterSettingsPage extends React.Component {
  renderPlaceholder () {
    return (
      <h5 className="geiger-counter-placeholder">
        Geiger Counter Integration is coming soon.
      </h5>
    )
  }

  render () {
    return (
      <div className="geiger-counter-settings-page">
        <h2>
          { I18n.t("settings.geiger_counter.title") }
        </h2>

        { this.renderPlaceholder() }
      </div>
    )
  }
}

export default GeigerCounterSettingsPage;
