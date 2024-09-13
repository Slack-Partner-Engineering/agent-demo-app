export const get_channel_details = async (
  channel_id,
  slackClient
) => {
  try {
    const response = await slackClient.conversations.info({
      channel: channel_id,
    });

    return response;
  } catch (error) {
    console.error("Error fetching channel details:", error);
    throw error;
  }
};
