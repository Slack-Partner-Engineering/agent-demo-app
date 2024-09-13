//Checks if your app has access to a channel.
export const channel_membership_check = async (channel_id, slackClient) => {
  var is_member = true;
  try {
    const result = await slackClient.apiCall("conversations.info", {
      channel: channel_id,
    });
    is_member = result.status.ok;
  } catch (error) {
    console.error(error);
  }
  return is_member;
};
