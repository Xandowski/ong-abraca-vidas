import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@supabase/supabase-js', () => ({
  createClient: () => {
    const result: any = {
      _data: [{ id: 1, name: 'Rex' }],
      from() { return this; },
      select() { return this; },
      order() { return this; },
      eq() { return this; },
      limit() { return this; },
      then(resolve: any) { resolve({ data: this._data, error: null }); }
    };
    return result;
  }
}));

import { GET } from '../../src/app/api/animals/route';

describe('GET /api/animals', () => {
  it('deve retornar lista de animais sem filtros', async () => {
    const req = { url: 'http://localhost' } as unknown as Request;
    const res = await GET(req);
    // NextResponse.json retorna um Response-like com json()
    const body = await (res as any).json();
    expect(Array.isArray(body)).toBe(true);
    expect(body[0]).toHaveProperty('id');
  });

  it('deve aceitar filtros de query (limit e type)', async () => {
    const req = { url: 'http://localhost/?limit=1&type=dog' } as unknown as Request;
    const res = await GET(req);
    const body = await (res as any).json();
    expect(Array.isArray(body)).toBe(true);
  });
});
