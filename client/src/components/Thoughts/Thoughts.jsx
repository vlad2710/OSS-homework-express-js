import React, { Component } from "react";
import Thought from "./Thought/Thought";
import "./Thoughts.css";

export default class Thoughts extends Component {
  render() {
    const {
      thoughts,
      handleReaction,
      handleThoughtDelete,
      handleCurrentThoughtSave,
      thoughtRef,
    } = this.props;
    return (
      <div className="thoughts">
        {thoughts.map((thought, i) => {
          return (
            <Thought
              key={thought.key}
              thought={thought}
              handleReaction={handleReaction}
              handleThoughtDelete={handleThoughtDelete}
              handleCurrentThoughtSave={handleCurrentThoughtSave}
              thoughtRef={i === thoughts.length - 1 ? thoughtRef : null}
            />
          );
        })}
      </div>
    );
  }
}
