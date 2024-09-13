//Used to build the context of a conversation with a user. It takes in a type of message and formarts it for use with an LLM.
export const build_context = (messages, type: string) => {
  switch (type) {
    case "history_response":
      var messageObject = [];
      messages.messages.forEach((message) => {
        if (message.subtype === "assistant_app_thread") return;
        var specificMessage = {
          content: "",
          role: "",
          unixDateTime: "",
        };
        specificMessage.content = message.text;
        specificMessage.unixDateTime = message.ts;
        if (message.bot_id) {
          specificMessage.role = "assistant";
        } else {
          specificMessage.role = "user";
        }
        messageObject.push(specificMessage);
      });
      messageObject.sort((a, b) => a.unixDateTime - b.unixDateTime);
      return messageObject;
    case "custom":
      console.log("Handling custom...");
      break;
    default:
      console.log("Unknown type");
      break;
  }
};
