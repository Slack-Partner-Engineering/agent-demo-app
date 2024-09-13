//This handles the user messages from the container. It checks if the user is a first time user.
//It will first set the status to show that the app is thinking.
// import { call_llm } from "../llm/anthropic";
import { call_salesforce_llm } from "../llm/salesforce";
import { get_prompts } from "../actions/get_prompts";
import { getNewUser, setNewUser } from "../database/key_value_db";
import { new_user_message } from "../actions/new_user_onboarding";

export const container_message = async (type, event, res, slackClient) => {
  try {
    await slackClient.apiCall("assistant.threads.setStatus", {
      channel_id: event.channel,
      status: `Hang tight...`,
      thread_ts: event.thread_ts || event.ts,
    });
  } catch (error) {
    console.error(error);
  }

  if (getNewUser(event.user)) {
    //the user has interacted with the app before
    try {
      // const llm_response = await call_llm(
      //   event.text,
      //   event.thread_ts || event.ts,
      //   event.channel,
      //   slackClient
      // );
      
      if (event.text.startsWith('How do I generate an NDA'))
        event.text += ' Here is an example of how I could possibly create one https://goodgrants.com/resources/articles/how-to-create-a-simple-but-effective-nda-or-confidentiality-agreement/'
      
      if (event.text.startsWith('Can I adjust the service level agreement (SLA)'))
        event.text += ' Here is an example of how to write one https://www.atlassian.com/itsm/service-request-management/slas'

      if (event.text.startsWith('Can we share customer data'))
        event.text += ' Here is an article that discusses this topic https://www.prevalent.net/blog/third-party-data-sharing-compliance/#:~:text=Third%2DParty%20Data%20Sharing%20%26%20Compliance&text=For%20example%2C%20sharing%20customer%20information,adherence%20to%20PCI%20DSS%20standards.'
      
      const llm_response = await call_salesforce_llm(
        event.text,
        event.thread_ts || event.ts,
        event.channel,
        slackClient,
        'sfdc_ai__DefaultOpenAIGPT35Turbo'
      );

      await slackClient.chat.postMessage({
        channel: event.channel,
        text:
          llm_response ||
          'Sorry, the LLM threw an "Overloaded" API error. They are having issues.',
        thread_ts: event.thread_ts || event.ts,
      });
    } catch (error) {
      console.error(error);
    }
    //functionality for additional prompts has not yet been released.
    // try {
    //   await slackClient.apiCall("assistant.threads.setSuggestedPrompts", {
    //     channel_id: event.channel,
    //     thread_ts: event.thread_ts || event.ts,
    //     prompts: get_prompts(event.user),
    //   });
    // } catch (error) {
    //   console.error(error);
    // }
  } else {
    //first time the user is messaging the app
    await new_user_message(
      event.user,
      event.thread_ts || event.ts,
      slackClient
    );
    setNewUser(event.user, true);
    container_message(type, event, res, slackClient);
  }
};
