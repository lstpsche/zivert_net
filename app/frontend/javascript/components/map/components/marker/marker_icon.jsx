class MarkerIcon extends React.Component {
  render () {
    const { text, className } = this.props;

    return (
      <div className={"marker-icon " + className}>
        {text}
      </div>
    )
  }
}

MarkerIcon.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
}

MarkerIcon.defaultProps = {
  text: "",
  className: ""
}

export default MarkerIcon;
