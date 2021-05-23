import fetchLink from "../../../helpers/fetch_link";
import { Link } from "react-router-dom";

class DropdownItem extends React.Component {
  onButtonClick ({ link, method, onSuccessCallback }) {
    fetchLink({
      link: link,
      method: method,
      onSuccess: (response) => {
        if (typeof(onSuccessCallback) === "function")
          onSuccessCallback(response);
      }
    });
  }

  itemLink ({ link, className = "", id, title }) {
    return (
      <Link
        to={link}
        id={id}
        className={"dropdown-item " + className}
      >
        {title}
      </Link>
    )
  }

  itemButton (item) {
    const { className = "", id, title } = item;

    return (
      <button
        id={id}
        className={"dropdown-item " + className}
        onClick={() => this.onButtonClick(item)}
      >
        {title}
      </button>
    )
  }

  render () {
    const { item } = this.props;

    if (item.method === "GET")
      return this.itemLink(item)
    else
      return this.itemButton(item)
  }
}

DropdownItem.propTypes = {
  item: PropTypes.object
}

DropdownItem.defaultProps = {
  item: {
    link: "",
    method: "GET",
    className: "",
    id: "",
    title: "Sample item title",
    onSuccessCallback: () => {}
  }
}

export default DropdownItem;
