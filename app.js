const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = 9900;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post("/", (req, res) => {
  console.log("before fetch log: ----", req.body);

  fetch(
    "https://script.google.com/macros/s/AKfycbzCZD_zjF8J8wxwfLBOrJWayjAiGhjKd07pXKZF_e9Q-F8M1161YxTPR_GjbWbDltno/exec",
    {
      body: JSON.stringify(req.body),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "post",
    }
  )
    .then((res) => {
      console.log("primul json", res);
      return res.json;
    })
    .then((resp) => {
      console.log("de la google good ", resp);

      res.end();
    })
    .catch((err) => {
      console.log("de la google bad ", err);
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
