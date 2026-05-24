import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

// Mock components and hooks used by the page
vi.mock('@/components/AnimalCard', () => ({
  default: ({ name }: any) => <div data-testid="animal-card">{name}</div>
}));
vi.mock('@/components/Navbar', () => ({ default: () => <nav /> }));
vi.mock('@/components/Footer', () => ({ default: () => <footer /> }));

vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({ toast: vi.fn() })
}));

vi.mock('@/hooks/useSupabase', () => ({
  useSupabase: () => ({
    supabase: {
      from: () => ({
        select: () => ({
          order: () => Promise.resolve({ data: [
            { id: 1, name: 'Rex', type: 'dog', size: 'medium', isAdopted: false, imageUrl: '' }
          ], error: null })
        })
      })
    }
  })
}));

import Animals from '../../src/app/animais/page';

describe('Animais page', () => {
  it('deve renderizar lista de animais e mostrar contagem', async () => {
    render(<Animals />);

    await waitFor(() => {
      expect(screen.getByText(/1 animais encontrados/i)).toBeInTheDocument();
    });

    expect(screen.getByTestId('animal-card')).toHaveTextContent('Rex');
  });
});
