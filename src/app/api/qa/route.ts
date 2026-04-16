import { NextResponse } from 'next/server';
import { answerQuestionFromDocs } from '@/lib/qa/answer';

export const runtime = 'nodejs';

type QaRequestBody = {
  question?: unknown;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export async function POST(req: Request) {
  console.log('@POST::API_REQUEST');
  let body: QaRequestBody | null = null;

  try {
    body = (await req.json()) as QaRequestBody;
    console.log({ body });
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body. Expected { "question": string }.' },
      { status: 400 }
    );
  }

  const question = body?.question;
  if (!isNonEmptyString(question)) {
    return NextResponse.json({ error: 'question must be a non-empty string' }, { status: 400 });
  }

  try {
    const { answer, sources } = await answerQuestionFromDocs(question);

    console.log('@POST: answer', answer);
    console.log('@POST: sources', sources);

    return NextResponse.json({ answer, sources }, { status: 200 });
  } catch (err) {
    console.error('@POST: error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
