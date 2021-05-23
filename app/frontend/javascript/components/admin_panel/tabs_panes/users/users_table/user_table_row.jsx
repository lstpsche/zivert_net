class UserTableRow extends React.Component {
  render () {
    const { user: { id, firstName, lastName, username, nickname } } = this.props;

    return (
      <tr className="user-table-row">
        <td>{ id }</td>
        <td>{ firstName }</td>
        <td>{ lastName }</td>
        <td>{ username }</td>
        <td>{ nickname }</td>
      </tr>
    )
  }
}

UserTableRow.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserTableRow;
