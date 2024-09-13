import express from "express";
import bodyParser from "body-parser";
import { WebClient } from "@slack/web-api";
import dotenv from "dotenv";
// import { load_docs } from "./llm/embeddings/get_embedding";
import { event_handler } from "./events/event_handler";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const slackToken = process.env.SLACK_BOT_TOKEN;
const slackClient = new WebClient(slackToken);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// load_docs();

app.get("/", (req, res) => {
  res.send("Running...");
});

app.post("/slack/events", async (req, res) => {
  const { type, challenge, event } = req.body;
  if (type === "url_verification") { //Slack will check this when setting up the app initially in the app setup UI.
    return res.status(200).json({ challenge });
  } else {
    res.status(200).send("Event received");
    event_handler(type, challenge, event, res, slackClient);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
