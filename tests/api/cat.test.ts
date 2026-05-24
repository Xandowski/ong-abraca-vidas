import { describe, it, expect, vi } from 'vitest';

import { GET } from '../../src/app/api/cat/route';

describe('GET /api/cat', () => {
  it('deve retornar imagem de gato', async () => {
    // Mock global fetch usado dentro da rota
    vi.stubGlobal('fetch', async () => ({
      ok: true,
      json: async () => [{ id: 'abc', url: 'https://example.com/cat.jpg' }]
    }));

    const res = await GET();
    const body = await (res as any).json();
    expect(Array.isArray(body)).toBe(true);
    expect(body[0]).toHaveProperty('url');
  });
});
