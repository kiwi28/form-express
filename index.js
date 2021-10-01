import express from "express";
import fetch from "node-fetch";
const app = express();
const port = 3000;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post("/", (req, res) => {
  console.log("before fetch log: ----", req.body);

  fetch(
    "https://script.google.com/macros/s/AKfycbxm-AFizE_lWexi_Kg84sqZ9iqc1-XYVrqT4skwp70O_DeEl8FzKTLm1UMjbm4oPebs/exec",
    {
      body:
        "name=test&phone=769814325&email=kiwi@example.com&message=rdfauhvfdahjadsfkjhkfdashjb",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "post",
    }
  )
    .then((res) => res.json)
    .then((resp) => {
      console.log("de la google good ", resp);
      res.send(resp);
    })
    .catch((err) => {
      console.log("de la google bad ", err);
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
