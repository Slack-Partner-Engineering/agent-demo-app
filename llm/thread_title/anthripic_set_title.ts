import Anthropic from "@anthropic-ai/sdk";

export const get_thread_title = async (message) => {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC,
  });

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      system: `Just return the summary of the message, not anything explaining the summary. I am using this to set a title of a conversation.`,
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `Can you summarize this message in 50 characters or less: ${message}`,
        },
      ],
    });
    return msg.content[0].text;
  } catch (error) {
    console.log(error);
  }
  return "";
};
