// //Example LLM used here is Anthropic. This handles the logic of calling the llm,
// // storing the messages, and passing the doc lookup and previous context.
// //The previous context could also be sent as an array to Anthropic but this solutions is more portable to other
// // LLMs and the results were essentually the same.
// //Also the thread title is set if the thread is not recognized.

// import Anthropic from "@anthropic-ai/sdk";
// import { get_embedding } from "./embeddings/get_embedding";
// import { get_context, update_context } from "../actions/get_context";

// export const call_llm = async (message, thread_ts, channel_id, slackClient) => {
//   const system = await get_embedding(message);
//   const context = await get_context(
//     thread_ts,
//     channel_id,
//     slackClient,
//     message
//   );
//   update_context(message, "user", Date.now(), thread_ts);
//   const anthropic = new Anthropic({
//     apiKey: process.env.ANTHROPIC,
//   });
//   try {
//     const msg = await anthropic.messages.create({
//       model: "claude-3-opus-20240229",
//       system: `Response should be formatted to look good in Slack. Also keep your answers consise. Please use this context also if the question pertains to it: ${system}. Here is a JSON of the conversation so far: ${JSON.stringify(
//         context
//       )}`,
//       max_tokens: 1024,
//       messages: [
//         {
//           role: "user",
//           content: `${message}`,
//         },
//       ],
//     });
//     update_context(msg.content[0].text, "assistant", Date.now(), thread_ts);
//     return msg.content[0].text;
//   } catch (error) {
//     console.log(error);
//   }
// };
