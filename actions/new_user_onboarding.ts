//Hard codes the message sent for a new user. This can be used to start an onboarding journey,
// send TOS, or anything else.
export const new_user_message = async (channel_id, thread_ts, slackClient) => {
  // try {
  //   await slackClient.chat.postMessage({
  //     channel: channel_id,
  //     text: ":wave: Welcome, please make sure to review our <https://www.slack.com|Terms>.",
  //     thread_ts: thread_ts,
  //     unfurl_links: false,
  //   });
  // } catch (error) {
  //   console.error(error);
  // }
};
