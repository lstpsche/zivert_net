class MarkerIcon extends React.Component {
  render () {
    const { text } = this.props;

    return (
      <div className="marker-icon">
        {text}
      </div>
    )
  }
}

MarkerIcon.propTypes = {
  text: PropTypes.string
}

MarkerIcon.defaultProps = {
  text: ''
}

export default MarkerIcon;
