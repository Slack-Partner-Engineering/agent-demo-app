//Calls Slack Web API to pull history of a particlur thread with a user.
export const get_thread_history = async (
  channel_id,
  thread_ts,
  slackClient
) => {
  try {
    const response = await slackClient.conversations.replies({
      channel: channel_id,
      ts: thread_ts,
      latest: "now",
      limit: 5,
    });

    return response;
  } catch (error) {
    console.error("Error fetching thread history:", error);
    throw error;
  }
};
