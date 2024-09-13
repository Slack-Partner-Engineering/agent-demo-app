
//Hard coded helper file with prompts to use.
export const get_prompts = async (user_id, channel_details) => {
  //hard coded for general prompts.
  let prompts = [];
  const channel_name = channel_details.channel.name;

  if (channel_name.includes("help-legal")) {
    prompts = [
      {
        title: "How do I generate an NDA?",
        message: "How do I generate an NDA for a customer?",
      },
      {
        title: "Can I modify the SLA in a contract?",
        message: "Can I adjust the service level agreement (SLA) in a contract to meet the client's demands?",
      },
      {
        title: "Can we share customer data with a 3rd party vendor?",
        message: "Can we share customer data with a third-party vendor?",
      },
    ];
  } else if (channel_name.includes("help-it")) {
    prompts = [
      {
        title: "How do I connect to the office Wifi?",
        message: "How do I connect to the office Wifi?",
      },
      {
        title: "How can I upgrade my device?",
        message: "How can I upgrade my device?",
      },
      {
        title: "How can I request access to software",
        message: "How can I request access to software",
      },
    ];
  } else if (channel_name.includes("external-omega-inc") || channel_name.includes("quote-approvals-omega-inc")) {
    prompts = [
      {
        title: "What is the latest news about this account?",
        message: "What is the latest news about this account?",
      },
      {
        title: "Are there upcoming meetings scheduled?",
        message: "Are there upcoming meetings scheduled?",
      },
      {
        title: "What are next steps with this account?",
        message: "What are next steps with this account?",
      },
    ];
  } else {
    prompts = [
      {
        title: "What's trending in the industry today?",
        message: "What's trending in the industry today?",
      },
      {
        title: "What are my upcoming meetings?",
        message: "What are my upcoming meetings?",
      },
      {
        title: "What do I have to do today?",
        message: "What do I have to do today?",
      },
    ];
  }

  return prompts;
};
