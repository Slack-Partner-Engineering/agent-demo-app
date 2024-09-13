//Sample DB in memory. Cleared every time the app restarts.
//It's kehy value that supports checking for a first time user and storing thread history.
import * as cache from "memory-cache";

export function setNewUser(key: string, value: boolean) {
  //key=user_id, value=true/false
  cache.put(key, value, 36000000);
}

export function getNewUser(key: string): any {
  return cache.get(key);
}

export function deleteUser(key: string): void {
  cache.del(key);
}

export function setNewThread(key: string, value: string) {
  const messageArray = JSON.parse(value);
  if (messageArray.length > 4) messageArray.shift();
  cache.put(key, JSON.stringify(messageArray), 36000000);
}

export function getThread(key: string): any {
  const record = cache.get(key);
  if (record) {
    const storedContext = JSON.parse(record);
    storedContext.forEach((message) => {
      const maxLength = 300; //size of each message, set higher if you want to have larger messages sent to the llm
      const truncatedSuffix = "...truncated";
      if (message.content.length > maxLength) {
        message.content =
          message.content.substring(0, maxLength - truncatedSuffix.length) +
          truncatedSuffix;
      }
    });
    return JSON.stringify(storedContext);
  } else {
    return null;
  }
}

export function deleteThread(key: string): void {
  cache.del(key);
}
