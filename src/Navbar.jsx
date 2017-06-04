import React, {Component} from 'react';

class NavBar extends Component {



  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className="alert">There are {this.props.userCountProp} users online</div>
      </nav>
    );
  }
}

export default NavBar;