const express = require("express");
const fetch = require("cross-fetch");

const app = express();
const PORT = process.env.PORT || 8080;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from kiwi's app engine");
});

app.post("/", (req, res) => {
  console.log("before fetch log: ----", req.body);

  fetch(
    "https://script.google.com/macros/s/AKfycby8peWZGHEq_PjuLCGyoStI-X4OpmHlhRMjwVonXqgvDcGEeTrMj4UL-uxhqcSebFyj/exec",
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

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
