# Install Instructions

1. Clone this Repo: `https://github.com/Slack-Partner-Engineering/assistant-sample-app.git`
2. Run `npm install`.
3. You will need the following environment variables: `ANTHROPIC`, `SLACK_BOT_TOKEN`, `OPEN_API_KEY`

## Heroku Instructions

You can host the application anywhere, even run it locally (check out [NGROK](https://ngrok.com/)). If you want to use Heroku, follow the instructions below:

- Go to [Heroku](https://dashboard.heroku.com/) and create a new application.
- Connect it using Heroku Git or to GitHub under the Deploy section.
- Under settings, enter the variables from step 3 above into the `Config Vars` section.
- Deploy the app to a pipeline on Heroku.
- Click `Open app` and note the URL for your new app.
- When you setup your new application following [these](https://api.slack.com/partners/modern-ai-apps#getting-started) instructions. Use the above URL for the events API.

## Implementation Notes

- There is a lightweight RAG implemenation in the sample app.
  - To update the RAG sample data. Go to `llm/embeddings/data.txt` and put your own sample data in the file.
- When a user first sends a message to the app or opens the container, it will go through the onboarding message.
  - It will respond sending `Terms` to the user, it then responds normally based on the user message. This should be updated to an oboarding journey, message, or actual terms if needed.
  - These will only be show to the user once, but all data is wiped when the app restarts so you will see it once per user whenever the app is restarted.
- There are two databases in the sample application. They are both setup in memory so nothing is needed to use them with the sample code.
  - The embeddings created from the file are stored in a vector database.
  - The new user flags are stored in a key-value database.
- This application does not use Block Kit, this was done to keep it simple. Block Kit is fully supported.
- There are a couple of areas that are not supported by this app and the app will tell the user when it encounters them.
  - @mentioning the bot user.
  - Sending anything besides text to the app. No files or media.
- When a user sends a message to the app in a thread for the first time it will get a summary of the question and update the title of the thread in Slack.
- As you interact with the app the context will be stored and you can send it to the LLM and/or use it for logging.
  - It is limited to 5 past messages by default but this can be configured.
  - As mentioned above the DB is in memory, so if a thread is loaded without history in the app, maybe because the application restarted, the app will make a call to the Slack Web API to pull in the past conversation.
  - The app will format the context with a role, content, and datetime.
  - To keep the overall context a reasonable size, messages are truncated at 300 characters. This is configuarable.
