//Captures and responds to the new event emitted when a new container is opened.
//It will send sample prompts, a welcome message, and a first time user message when needed.
import { get_prompts } from "../actions/get_prompts";
import { getNewUser, setNewUser } from "../database/key_value_db";
import { new_user_message } from "../actions/new_user_onboarding";
import { get_channel_details } from "../actions/get_channel_details";

export const thread_started = async (type, event, res, slackClient) => {
  if (getNewUser(event.assistant_thread.user_id)) {
    try {
      const res = await slackClient.chat.postMessage({
        channel: event.assistant_thread.user_id,
        text: ":wave: Howdy, how can I help you? Here are some popular topics I'm really good at helping with:",
        thread_ts: event.assistant_thread.thread_ts,
      });
    } catch (error) {
      console.error(error);
    }
    try {

      const channel_details = await get_channel_details(event.assistant_thread.context.channel_id, slackClient)

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
  } else {
    await new_user_message(
      event.assistant_thread.channel_id,
      event.assistant_thread.thread_ts,
      slackClient
    );
    setNewUser(event.assistant_thread.user_id, true);
    thread_started(type, event, res, slackClient);
  }
};
