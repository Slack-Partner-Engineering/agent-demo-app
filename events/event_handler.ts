//Handles the different events sent from Slack to the app.
import { app_mention } from "./app_mention";
import { thread_started } from "./assistant_thread_started";
import { container_message } from "./container_message";
import { not_supported } from "./not_supported";
import { url_verify } from "./url_verify";
import { get_prompts } from "../actions/get_prompts";
import { get_channel_details } from "../actions/get_channel_details";

export const event_handler = async (
  type,
  challenge,
  event,
  res,
  slackClient
) => {
  // res.status(200).send("Event received");
  // if (type === "url_verification") {
  //   url_verify(type, challenge, event, res);
  // }
  if (
    type === "event_callback" &&
    typeof event.bot_profile === "undefined" &&
    typeof event.files === "undefined"
  ) {
    if (event.type === "app_mention") {
      app_mention(type, event, res, slackClient);
    } else if (
      event.subtype === "message_changed" &&
      event.message.subtype === "assistant_app_thread"
    ) {
    } else if (event.type === "assistant_thread_started") {
      thread_started(type, event, res, slackClient);
      
    } else if (event.type === "assistant_thread_context_changed") {

      const channel_details = await get_channel_details(event.assistant_thread.context.channel_id, slackClient)

      try {
        const res = await slackClient.apiCall(
          "assistant.threads.setSuggestedPrompts",
          {
            thread_ts: event.assistant_thread.thread_ts,
            channel_id: event.assistant_thread.channel_id,
            prompts: await get_prompts(event.assistant_thread.user_id, channel_details),
          }
        );
      } catch (error) {
        console.error(error);
      }
    } else if (event.type === "message") {
      container_message(type, event, res, slackClient);
    }
  } else {
    not_supported(type, event, res, slackClient);
  }
};
