const express = require("express");
const { query, matchedData, validationResult } = require("express-validator");
const app = express();

app.use(express.json());
app.get(
  "/hello",
  query("person")
    .notEmpty()
    .escape()
    .withMessage("person query khong duoc de trong"),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const data = matchedData(req);
      console.log(data);
      return res.send(`Hello, ${req.query.person}!`);
    }
    console.log(errors.array);
    res.status(400).json({ errors: errors.array() });
  }
);

app.listen(3000, () => {
  console.log("Server is runing on port 3000");
});
