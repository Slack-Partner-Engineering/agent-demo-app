//Covers the use case when a user tries to mention the app vs just talk in the container
export const app_mention = async (type, event, res, slackClient) => {
  try {
    await slackClient.chat.postMessage({
      channel: event.channel,
      text: `Sorry <@${event.user}> you don't need to @-mention me, just write to me in the container.`,
    });
  } catch (error) {
    console.error(error);
  }
};
