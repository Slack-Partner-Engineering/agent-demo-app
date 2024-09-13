// //Used to support the RAG use case.
// //An in memory vector DB is used with the openai embedding model as a sample.
// //Everytime the app starts the docs file is read, chucked, and stored.
// //Everytime a user interacts with the app, get_embedding will be called.
// //LLM agent/tool chaining is not in this sample although that would be a better way to do it, just out of scope of this app.
// import { MemoryVectorStore } from "langchain/vectorstores/memory";
// import { OpenAIEmbeddings } from "@langchain/openai";
// import { TextLoader } from "langchain/document_loaders/fs/text";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// var vectorStore;

// export const get_embedding = async (text) => {
//   const result = await vectorStore.similaritySearch(text, 3);

//   var docsToReturn;
//   result.forEach((element) => {
//     docsToReturn += element.pageContent;
//   });
//   return docsToReturn;
// };

// export const load_docs = async () => {
//   const splitter = new RecursiveCharacterTextSplitter({
//     chunkSize: 200,
//     chunkOverlap: 100,
//   });

//   const loader = new TextLoader("./llm/embeddings/data.txt");
//   const docs = await loader.loadAndSplit(splitter);

//   // vectorStore = await MemoryVectorStore.fromDocuments(
//   //   docs,
//   //   new OpenAIEmbeddings({
//   //     apiKey: process.env.OPEN_API_KEY,
//   //     model: "text-embedding-3-small",
//   //   })
//   // );
// };
