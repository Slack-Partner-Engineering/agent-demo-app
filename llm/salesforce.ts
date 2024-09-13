//Example LLM used here is Anthropic. This handles the logic of calling the llm,
// storing the messages, and passing the doc lookup and previous context.
//The previous context could also be sent as an array to Anthropic but this solutions is more portable to other
// LLMs and the results were essentually the same.

import axios from 'axios';
import { get_salesforce_token } from "../util/auth_salesforce"
import { get_context, update_context } from "../actions/get_context";

const channel_messages = {
  "subtype": "bot_message",
  "text": "<salesforce.com/|@Cindy> is requesting approval for *United Regional Hospital-discount* Salesforce :thumbsup: *Approvals Required* `SALES_L1` &gt; `SALES_L2` &gt; `SALES_OPS` &gt; `LEGAL`  Details button :handshake: *Proposed Structure* *Close Date* 2025-05-31 *Total Contract Value* $154,721 *Subscription Term* 12 months *Payment Terms* Net 30 *Payment Frequency* Standard :ok_hand: *Asks &amp; Justification* This starter deal will lead to wider account penetration and they will sign by the end of the month if we can offer this tiny discount. They also will be accepting our standard agreement, no redlines. :writing_hand: *Quote Lines*: *250* x packs with `25%` discount Details button",
  "username": "Quote Approvals",
  "icons": {
      "image_48": "https://s3-us-west-2.amazonaws.com/slack-files2/bot_icons/2024-09-05/7684285681539_48.png"
  },
  "type": "message",
  "ts": "1725554572.118939",
  "app_id": "A06GWJ9FHUN",
  "thread_ts": "1725554572.118939",
  "reply_count": 9,
  "reply_users_count": 4,
  "latest_reply": "1725554583.313059",
  "reply_users": [
      "U00",
      "U06H09LNQHK",
      "U06HFSJB317",
      "U06H5LNK2HJ"
  ],
  "is_locked": false,
  "subscribed": false,
  "blocks": [
      {
          "type": "section",
          "block_id": "tNKSz",
          "text": {
              "type": "mrkdwn",
              "text": "<salesforce.com/|@Cindy> is requesting approval for *United Regional Hospital-discount*",
              "verbatim": false
          },
          "accessory": {
              "type": "image",
              "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDqciAcQz6TcRhYGPyghHTUgXYea_3qCNlDyBPeex9tw&s",
              "alt_text": "Salesforce"
          }
      },
      {
          "type": "section",
          "block_id": "4LCiG",
          "text": {
              "type": "mrkdwn",
              "text": ":thumbsup: *Approvals Required*",
              "verbatim": false
          }
      },
      {
          "type": "divider",
          "block_id": "SMiy3"
      },
      {
          "type": "section",
          "block_id": "07FxO",
          "text": {
              "type": "mrkdwn",
              "text": "`SALES_L1` &gt; `SALES_L2` &gt; `SALES_OPS` &gt; `LEGAL` ",
              "verbatim": false
          },
          "accessory": {
              "type": "button",
              "action_id": "button-action",
              "text": {
                  "type": "plain_text",
                  "text": "Details",
                  "emoji": true
              },
              "value": "click_me_123"
          }
      },
      {
          "type": "section",
          "block_id": "cFpgh",
          "text": {
              "type": "mrkdwn",
              "text": ":handshake: *Proposed Structure*",
              "verbatim": false
          }
      },
      {
          "type": "divider",
          "block_id": "czWf7"
      },
      {
          "type": "section",
          "block_id": "0QQBQ",
          "fields": [
              {
                  "type": "mrkdwn",
                  "text": "*Close Date*",
                  "verbatim": false
              },
              {
                  "type": "mrkdwn",
                  "text": "2025-05-31",
                  "verbatim": false
              },
              {
                  "type": "mrkdwn",
                  "text": "*Total Contract Value*",
                  "verbatim": false
              },
              {
                  "type": "mrkdwn",
                  "text": "$154,721",
                  "verbatim": false
              },
              {
                  "type": "mrkdwn",
                  "text": "*Subscription Term*",
                  "verbatim": false
              },
              {
                  "type": "mrkdwn",
                  "text": "12 months",
                  "verbatim": false
              },
              {
                  "type": "mrkdwn",
                  "text": "*Payment Terms*",
                  "verbatim": false
              },
              {
                  "type": "mrkdwn",
                  "text": "Net 30",
                  "verbatim": false
              },
              {
                  "type": "mrkdwn",
                  "text": "*Payment Frequency*",
                  "verbatim": false
              },
              {
                  "type": "mrkdwn",
                  "text": "Standard",
                  "verbatim": false
              }
          ]
      },
      {
          "type": "divider",
          "block_id": "TyoHp"
      },
      {
          "type": "section",
          "block_id": "cNoLn",
          "text": {
              "type": "mrkdwn",
              "text": ":ok_hand: *Asks &amp; Justification*",
              "verbatim": false
          }
      },
      {
          "type": "section",
          "block_id": "s9Q5v",
          "text": {
              "type": "mrkdwn",
              "text": "This starter deal will lead to wider account penetration and they will sign by the end of the month if we can offer this tiny discount. They also will be accepting our standard agreement, no redlines.",
              "verbatim": false
          }
      },
      {
          "type": "section",
          "block_id": "BtaOv",
          "text": {
              "type": "mrkdwn",
              "text": ":writing_hand: *Quote Lines*:",
              "verbatim": false
          }
      },
      {
          "type": "divider",
          "block_id": "1ovrb"
      },
      {
          "type": "section",
          "block_id": "6uynN",
          "text": {
              "type": "mrkdwn",
              "text": "*250* x packs with `25%` discount",
              "verbatim": false
          },
          "accessory": {
              "type": "button",
              "action_id": "button-action",
              "text": {
                  "type": "plain_text",
                  "text": "Details",
                  "emoji": true
              },
              "value": "click_me_123"
          }
      }
  ]
}

export const call_salesforce_llm = async (message, thread_ts, channel_id, slackClient, model) => {
  const context = await get_context(thread_ts, channel_id, slackClient, message);
  update_context(message, "user", Date.now(), thread_ts);


  try {
    const salesforceApiUrl = `https://api.salesforce.com/einstein/platform/v1/models/${model}/generations`;
    const salesforce_access_token = await get_salesforce_token();
    
    let body = {};
    if (message.startsWith("Why is there a discount")) {
      body = {
        prompt: `Response should be formatted to look good in Slack. Here is the question asked by the user: ${message}. Here is a JSON of the conversation so far for context (do not send this back). It is based on Slack Block Kit: ${JSON.stringify(channel_messages)}`
      }
    } else {
        body = {
        prompt: `Response should be formatted to look good in Slack. Here is the question asked by the user: ${message}. Here is a JSON of the conversation so far for context (do not send this back): ${JSON.stringify(context)}`
      }
    }
    const response = await axios.post(salesforceApiUrl, body, {
      headers: {
        'Authorization': `Bearer ${salesforce_access_token}`,
        'Content-Type': 'application/json',
        'x-sfdc-app-context': 'EinsteinGPT',
        'x-client-feature-id': 'ai-platform-models-connected-app',
        'Host': 'api.salesforce.com'
      },
    });

    const generatedText = response.data.generation.generatedText;
    update_context(generatedText, "assistant", Date.now(), thread_ts);

    return generatedText;
  }  catch (error) {
    // Log the request that was made
    if (error.config) {
      console.error('Request Config:');
      console.error('URL:', error.config.url);
      console.error('Method:', error.config.method);
      console.error('Headers:', JSON.stringify(error.config.headers, null, 2));
      if (error.config.data) {
          console.error('Data:', JSON.stringify(JSON.parse(error.config.data), null, 2));
      }
  }
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.status);
      throw new Error(`Salesforce API error: ${JSON.stringify(error.response.data)}`);
    } else {
      throw new Error(`Unexpected error fetching Salesforce API Token: ${error.message}`);
    }
  }
};

export const get_thread_title = async (message, model) => {
  try {
    const salesforceApiUrl = `https://api.salesforce.com/einstein/platform/v1/models/${model}/generations`;
    const salesforce_access_token = await get_salesforce_token();
    
    const body = {
      prompt: `Can you summarize this message in 50 characters or less: ${message}`,
    }
    const response = await axios.post(salesforceApiUrl, body, {
      headers: {
        'Authorization': `Bearer ${salesforce_access_token}`,
        'Content-Type': 'application/json',
        'x-sfdc-app-context': 'EinsteinGPT',
        'x-client-feature-id': 'ai-platform-models-connected-app',
        'Host': 'api.salesforce.com'
      },
    });

    return response.data.generation.generatedText;
  }  catch (error) {
    // Log the request that was made
    if (error.config) {
      console.error('Request Config:');
      console.error('URL:', error.config.url);
      console.error('Method:', error.config.method);
      console.error('Headers:', JSON.stringify(error.config.headers, null, 2));
      if (error.config.data) {
          console.error('Data:', JSON.stringify(JSON.parse(error.config.data), null, 2));
      }
  }
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.status);
      throw new Error(`Salesforce API error: ${JSON.stringify(error.response.data)}`);
    } else {
      throw new Error(`Unexpected error fetching Salesforce API Token: ${error.message}`);
    }
  }
};