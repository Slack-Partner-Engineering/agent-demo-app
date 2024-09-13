import { get_embedding, load_docs } from "./llm/embeddings/get_embedding";
import "dotenv/config";

const load = async () => {
  await load_docs();
  console.log(await get_embedding("How many days do I get off this year?"));
  console.log(
    await get_embedding(
      "What feedback should I provide about the new AI app container?"
    )
  );
};

load();
