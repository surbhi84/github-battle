import React from "react";
import { FaUserFriends, FaFighterJet, FaTrophy } from "react-icons/fa";
function Instructions() {
  return (
    <div className="instruction-container">
      <h1 className="center-text header-lg">Instructions</h1>
      <ol className="container-sm grid battle-instructions center-text">
        <li>
          <h3 className="header-sm">Enter two Github users</h3>
          <FaUserFriends
            className="bg-light"
            color="rgb(255,191,116)"
            size={140}
          />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet className="bg-light" color="#727272" size={140} />
        </li>
        <li>
          <h3 className="header-sm">See the winner</h3>
          <FaTrophy className="bg-light" color="rgb(255,215,0)" size={140} />
        </li>
      </ol>
    </div>
  );
}
class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.username);
  }

  render() {
    return (
      <>
        <form className="column player" onSubmit={this.handleSubmit}></form>
      </>
    );
  }
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Instructions />
      </>
    );
  }
}
