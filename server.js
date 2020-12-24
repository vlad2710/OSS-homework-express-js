const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

let thoughts = [];

app.get("/thoughts", (req, res) => {
  res.json(thoughts);
});

app.put("/thoughts-update", (req, res) => {
  const body = req.body;

  thoughts.map((item) => {
    if (item.key == body.key) {
      item[body.reactionKey] = body.reactionVal;
    }

    return item;
  });

  res.json({
    thoughts,
  });
});

app.put("/thoughts-change", (req, res) => {
  const body = req.body;

  thoughts.map((thought) => {
    if (thought.key === body.key) {
      thought.value = body.value;
      thought.lastEditted = Date.now();
    }

    return thought;
  });

  res.json({
    thoughts,
  });
});

app.post("/thoughts-add", (req, res) => {
  const body = req.body;

  const newThought = {
    key: thoughts.length,
    value: body.currentThought,
    liked: false,
    favorite: false,
    lastEditted: Date.now(),
  };

  thoughts.push(newThought);

  res.json({
    thoughts,
  });
});

app.delete("/thoughts-delete", (req, res) => {
  const body = req.body;

  let newArr = thoughts.filter((item) => item.key != body.thoughtKey);

  thoughts = newArr;

  res.json({
    thoughts,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
