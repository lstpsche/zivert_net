import DropdownItem from "./dropdown_item";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showMenu: false }

    this.handleClick = this.handleClick.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  handleClick () {
    const { showMenu } = this.state;

    if (showMenu)
      this.hideMenu();
    else
      this.showMenu();
  }

  hideMenu (event) {
    if (event === undefined || !this.dropdownContainer.contains(event.target))
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.hideMenu);
      });
  }

  showMenu () {
    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.hideMenu);
    });
  }

  renderHeader () {
    return {
      title: "Dropdown title",
      className: "",
      id: ""
    }
  }

  itemsList () {
    return [{}];
  }

  renderItems () {
    let menu = [];

    this.itemsList().forEach((item, index) => {
      menu.push(
        <DropdownItem key={index} item={item} />
      )
    });

    return menu;
  }

  renderMenu () {
    const { showMenu } = this.state;

    return (
      showMenu
        ? (
          <div
            className="dropdown-menu show"
            onClick={() => this.hideMenu()}
          >
            { this.renderItems() }
          </div>
        )
        : null
    )
  }

  render () {
    const header = this.renderHeader();

    return (
      <div
        ref={(el) => this.dropdownContainer = el}
        className="dropdown mr-2"
      >
        <button
          className={"dropdown-header dropdown-toggle " + header.className}
          id={header.id}
          onClick={this.handleClick}
        >
          { header.title }
        </button>

        { this.renderMenu() }
      </div>
    )
  }
}

// Dropdown.propTypes = {
//   header: {
//     title: PropTypes.string,
//     className: PropTypes.string,
//     id: PropTypes.string
//   },
//   items: [{
//     title: PropTypes.string,
//     link: PropTypes.string,
//     method: PropTypes.string,
//     className: PropTypes.string,
//     onClickCallback: PropTypes.func
//   }]
// }

export default Dropdown;
