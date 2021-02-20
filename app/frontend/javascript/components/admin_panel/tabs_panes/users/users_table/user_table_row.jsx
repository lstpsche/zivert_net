class UserTableRow extends React.Component {
  render () {
    const { user: { id, first_name, last_name, username, nickname } } = this.props;

    return (
      <tr className="user-table-row">
        <td>{ id }</td>
        <td>{ first_name }</td>
        <td>{ last_name }</td>
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
