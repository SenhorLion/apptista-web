import { describe, expect, it, vi } from 'vitest';

vi.mock('@/lib/qa/answer', () => {
  return {
    answerQuestionFromDocs: vi.fn(async (question: string) => {
      return { answer: `mocked: ${question}`, sources: ['manual.pdf'] };
    }),
  };
});

describe('/api/qa POST', () => {
  it('returns 400 for missing question', async () => {
    const { POST } = await import('./route');
    const req = new Request('http://localhost/api/qa', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json).toHaveProperty('error');
  });

  it('returns answer + sources for valid question', async () => {
    const { POST } = await import('./route');
    const req = new Request('http://localhost/api/qa', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question: 'How do I reset it?' }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({
      answer: 'mocked: How do I reset it?',
      sources: ['manual.pdf'],
    });
  });
});

