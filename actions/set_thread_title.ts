// import { get_thread_title } from "../llm/thread_title/anthripic_set_title";
import { get_thread_title } from "../llm/salesforce";


export const set_thread_title = async (
  message,
  channel_id,
  thread_ts,
  slackClient
) => {
  const title = await get_thread_title(message, 'sfdc_ai__DefaultOpenAIGPT35Turbo');
  try {
    const response = await slackClient.apiCall(
      "assistant.threads.setTitle",
      {
        channel_id: channel_id,
        thread_ts: thread_ts,
        title: title,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
