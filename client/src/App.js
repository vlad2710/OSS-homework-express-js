import React from "react";
import axios from "axios";
import { Component } from "react";
import "./App.css";
import Thoughts from "./components/Thoughts/Thoughts";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      thoughts: [],
      currentThought: "",
    };

    this.thoughtRef = React.createRef();

    this.scrollToRef = () => {
      !!this.thoughtRef &&
        this.thoughtRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    };

    this.handleReaction = (key, reactionKey, reactionVal) => {
      axios
        .put("/thoughts-update", {
          key,
          reactionKey,
          reactionVal,
        })
        .then((res) => {
          this.setState({
            thoughts: res.data.thoughts,
          });
        });
    };

    this.handleCurrentThoughtChange = (event) => {
      this.setState({
        currentThought: event.target.value,
      });
    };

    this.handleCurrentThoughtEnter = (target) => {
      if (!this.state.currentThought.length) {
        return;
      }

      if (target.charCode === 13) {
        axios
          .post("/thoughts-add", {
            currentThought: this.state.currentThought,
          })
          .then((res) => {
            this.setState(
              {
                thoughts: res.data.thoughts,
              },
              () => {
                this.scrollToRef();
              }
            );
          });

        this.setState({
          currentThought: "",
        });
      }
    };

    this.handleThoughtDelete = (key) => {
      axios
        .delete("/thoughts-delete", {
          data: {
            thoughtKey: key,
          },
        })
        .then((res) => {
          this.setState({
            thoughts: res.data.thoughts,
          });
        });
    };

    this.handleCurrentThoughtSave = (key, value) => {
      axios
        .put("/thoughts-change", {
          key,
          value,
        })
        .then((res) => {
          this.setState({
            thoughts: res.data.thoughts,
          });
        });
    };
  }

  componentDidMount() {
    axios.get("/thoughts").then((response) => {
      this.setState(
        {
          thoughts: response.data,
        },
        () => {
          if (this.state.thoughts.length) {
            this.scrollToRef();
          }
        }
      );
    });
  }

  render() {
    const { currentThought, thoughts } = this.state;

    return (
      <div className="App">
        <h1>My Thoughts App</h1>
        <Thoughts
          thoughts={thoughts}
          handleReaction={this.handleReaction}
          handleThoughtDelete={this.handleThoughtDelete}
          handleCurrentThoughtSave={this.handleCurrentThoughtSave}
          thoughtRef={this.thoughtRef}
        />
        <input
          type="text"
          className="create-thought"
          placeholder="Write your thought and click enter"
          value={currentThought}
          onChange={this.handleCurrentThoughtChange}
          onKeyPress={this.handleCurrentThoughtEnter}
        />
      </div>
    );
  }
}
