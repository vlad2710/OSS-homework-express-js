import React, { Component } from "react";
import "./ThoughtReaction.css";

export default class ThoughtReaction extends Component {
  render() {
    const { favorite, liked } = this.props.thought;
    const { handleLike, handleDislike } = this.props;

    return (
      <div className="reaction">
        <i
          className={`material-icons medium icon ${liked ? "selected" : ""}`}
          onClick={handleLike}
        >
          thumb_up_alt
        </i>
        <i
          className={`material-icons medium icon ${
            favorite ? "favorite-selected" : ""
          }`}
          onClick={handleDislike}
        >
          favorite
        </i>
      </div>
    );
  }
}
