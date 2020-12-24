import React, { Component } from "react";
import "./Thought.css";
import ThoughtReaction from "../ThoughtReaction/ThoughtReaction";

export default class Thought extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false,
      currentThought: this.props.thought.value,
    };

    this.getTimeEdittedLast = (date) => {
      return Math.ceil(
        (new Date().getTime() - new Date(date).getTime()) / 1000 / 60
      );
    };

    this.toggleIsEditMode = () => {
      if (this.state.isEditMode) {
        this.props.handleCurrentThoughtSave(
          this.props.thought.key,
          this.state.currentThought
        );
      }

      this.setState(({ isEditMode }) => {
        return {
          isEditMode: !isEditMode,
        };
      });
    };

    this.handleCurrentThoughtChange = (event) => {
      this.setState({
        currentThought: event.target.value,
      });
    };
  }

  render() {
    const {
      thought,
      handleReaction,
      handleThoughtDelete,
      thoughtRef,
    } = this.props;
    const { lastEditted } = this.props.thought;
    const { isEditMode, currentThought } = this.state;

    return (
      <div className="thought-container">
        <div className="thought" ref={thoughtRef}>
          {isEditMode ? (
            <input
              type="text"
              className="edit-thought"
              placeholder="Write your thought and click enter"
              value={currentThought}
              onChange={this.handleCurrentThoughtChange}
            />
          ) : (
            <span className="thought-value">
              <p className="last-edited">
                Added/Edited by you {this.getTimeEdittedLast(lastEditted)} min
                ago
              </p>
              {thought.value}
            </span>
          )}
          <div>
            <i
              className="material-icons icon medium edit-icon"
              onClick={this.toggleIsEditMode}
            >
              {isEditMode ? "save" : "edit"}
            </i>
            <i
              className="material-icons icon medium delete-icon"
              onClick={() => handleThoughtDelete(thought.key)}
            >
              delete
            </i>
          </div>
        </div>
        <ThoughtReaction
          thought={this.props.thought}
          handleLike={() =>
            handleReaction(thought.key, "liked", !thought.liked)
          }
          handleDislike={() =>
            handleReaction(thought.key, "favorite", !thought.favorite)
          }
        />
      </div>
    );
  }
}
