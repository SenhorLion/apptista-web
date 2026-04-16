import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { Document } from '@langchain/core/documents';
import { OpenAIEmbeddings } from '@langchain/openai';
import { CharacterTextSplitter } from '@langchain/textsplitters';
import fs from 'node:fs';
import path from 'node:path';
import { openai } from './openai.js';

const DEFAULT_MANUAL_PDF_PATH = path.join(
  process.cwd(),
  'public',
  'data',
  '_bambino',
  'bambino-instruction-manual.pdf'
);

const MANUAL_PDF_PATH = process.env.QA_MANUAL_PDF_PATH ?? DEFAULT_MANUAL_PDF_PATH;

type DocMetadata = Record<string, unknown>;

const createStore = async (docs: Document<DocMetadata>[]) =>
  MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());

/**
 * Load a PDF file and split into chunks
 */
export const docsFromPDF = async (pdf: string): Promise<Document<DocMetadata>[]> => {
  const loader = new PDFLoader(pdf);
  const docs = await loader.load();
  const splitter = new CharacterTextSplitter({
    separator: '. ',
    chunkSize: 2500,
    chunkOverlap: 250,
  });

  const splitDocs = await splitter.splitDocuments(docs);
  return splitDocs;
};

const loadStore = async () => {
  if (!fs.existsSync(MANUAL_PDF_PATH)) {
    throw new Error(`Manual PDF not found at: ${MANUAL_PDF_PATH}`);
  }
  const manual = await docsFromPDF(MANUAL_PDF_PATH);
  return createStore([...manual]);
};

/**
 * @param {string} question
 * @returns {Promise<{ answer: string; sources: string[] }>}
 */
export async function answerQuestionFromDocs(question: string = '') {
  const trimmed = typeof question === 'string' ? question.trim() : '';
  console.log('@answerQuestionFromDocs: question', trimmed);

  if (!trimmed) {
    throw new Error('question must be a non-empty string');
  }

  const store = await loadStore();
  const results = await store.similaritySearch(trimmed, 1);

  const response = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    temperature: 1,
    messages: [
      {
        role: 'assistant',
        content: 'You are a helpful AI assistant. Answer questions to your best ability.',
      },
      {
        role: 'user',
        content: `Answer the following question using the provided context. If you cannot answer the question with the context, don't lie and make up stuff. Just say you need more context.
        Question: ${trimmed}
  
        Context: ${results.map(r => r.pageContent).join('\n')}`,
      },
    ],
  });

  const answer = response.choices[0]?.message?.content ?? '';
  const sources = results.map(r => r.metadata?.source).filter(Boolean);

  return { answer, sources };
}
