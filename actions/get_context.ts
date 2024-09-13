//Used to get conversation history or to add a message to the history.
//Messages are added when a user sends a message and when the llm responds.
//It will check to see if there is a stored history of the conversation, and if not, it calls Slack to pull the history and store it.
//For new threads, it will call the llm to get a summary of the first message and set the thread title to that.
import { getThread, setNewThread } from "../database/key_value_db";
import { get_thread_history } from "./get_thread_history";
import { build_context } from "./build_context";
import { set_thread_title } from "./set_thread_title";

export const get_context = async (
  thread_ts,
  channel_id,
  slackClient,
  message
) => {
  if (getThread(thread_ts)) {
    return new Array(JSON.parse(getThread(thread_ts)));
  } else {
    set_thread_title(message, channel_id, thread_ts, slackClient);
    const messages = await get_thread_history(
      channel_id,
      thread_ts,
      slackClient
    );
    const context = build_context(messages, "history_response");
    setNewThread(thread_ts, JSON.stringify(context));
    return context;
  }
};

export const update_context = async (
  content,
  role,
  unixDateTime,
  thread_ts
) => {
  const newMessage = {
    content,
    role,
    unixDateTime,
  };
  const context = JSON.parse(getThread(thread_ts));
  context.push(newMessage);
  setNewThread(thread_ts, JSON.stringify(context));
};
