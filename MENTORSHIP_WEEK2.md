# Semana 2 — Testes unitários (frontend)

Objetivo: aprender a escrever e rodar testes unitários no frontend (React).

O que fazer
- Instalar:
  - `npm install -D vitest @testing-library/react @testing-library/jest-dom`
  - Adicionar script: `"test": "vitest"`
- Exercício: criar `src/__tests__/App.test.tsx` que:
  - Renderiza App e verifica que o título existe.
  - Simula clique no botão de idioma e verifica mudança de texto.
  - Mocka fetch para endpoints (sem chamadas reais).

Exemplo de teste (Vitest + Testing Library)
```ts
// filepath: src/__tests__/App.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { vi } from 'vitest';

// mock global fetch
vi.stubGlobal('fetch', vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'ok' })
  })
) as any);

describe('App', () => {
  it('renderiza título e muda idioma', async () => {
    render(<App />);
    expect(screen.getByText(/Servidor CORS|CORS Server/i)).toBeInTheDocument();
    const enButton = screen.getByTitle('English');
    fireEvent.click(enButton);
    expect(await screen.findByText(/CORS Server/i)).toBeInTheDocument();
  });
});
```

Dicas rápidas
- Testes rápidos e determinísticos: prefira mocks para rede.
- Use `vitest --watch` para desenvolvimento.

Critérios de aceitação
- `npm test` no frontend executa sem erro e tests críticos passam (título, mudança de idioma, mocks funcionais).

Links úteis
- Vitest: https://vitest.dev/
- Testing Library (React): https://testing-library.com/docs/react-testing-library/intro
