import React from "react";
import { Link } from "react-router-dom";


class Header extends React.Component {
  render() {
    return (
      <div className="ui secondary  menu">
        <Link to="/" className="item">
          Home
        </Link>
        <Link to="/oc_analyze" className="item">
          Option Chain
        </Link>
      </div>
    );
  }
}

export default Header;
