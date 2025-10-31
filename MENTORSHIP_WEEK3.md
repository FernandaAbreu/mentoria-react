# Semana 3 — Testes unitários (backend) e CORS/integração

Objetivo: testar services/controllers do backend e validar CORS e integração com o frontend.

O que fazer
- Backend:
  - Express + TypeScript: Jest + ts-jest.
    - `npm install -D jest ts-jest @types/jest`
    - `npx ts-jest config:init`
  - Nest: Jest já vem configurado.
  - Exercício: criar testes para o service que retorna mensagens dos endpoints (mockar dependências).
- CORS e integração:
  - Revisar Same-Origin Policy e preflight (OPTIONS).
  - Implementar/validar endpoints:
    - `/sem-cors` — sem cabeçalho CORS
    - `/com-cors` — `Access-Control-Allow-Origin: *`
    - `/cors-restrito` — origem específica
  - Teste de integração simples: chamar rota (ou mockar fetch no frontend) e verificar resposta.

Exemplo — rota Express com CORS por rota
```ts
// filepath: src/routes/example.ts
import express from 'express';
const router = express.Router();

router.get('/sem-cors', (req, res) => {
  res.json({ message: 'sem cors' });
});

router.get('/com-cors', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ message: 'com cors' });
});

router.options('/cors-restrito', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});

router.get('/cors-restrito', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.json({ message: 'cors restrito' });
});

export default router;
```

Exemplo de teste backend com Jest (service simples)
```ts
// filepath: src/__tests__/app.service.spec.ts
import { AppService } from '../app.service';

describe('AppService', () => {
  let service: AppService;
  beforeEach(() => {
    service = new AppService();
  });

  it('retorna mensagem sem cors', () => {
    expect(service.getSemCorsMessage()).toBe('Resposta sem cabeçalho CORS');
  });

  it('retorna mensagem com cors liberado', () => {
    expect(service.getComCorsMessage()).toContain('CORS');
  });
});
```

Critérios de aceitação
- `npm test` no backend executa sem erro com testes cobrindo services/controllers.
- Frontend consegue chamar endpoints conforme esperado (sem erros CORS quando apropriado).

Links úteis
- Jest: https://jestjs.io/
- MDN CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
- Express CORS middleware: https://www.npmjs.com/package/cors
