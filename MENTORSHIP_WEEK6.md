# Semana 6 — Micro Frontends (MFE): Arquitetura Modular no Frontend

Objetivo: implementar micro frontends para modularizar a aplicação, focando em um módulo de carrinho e pagamento com comunicação entre módulos.

O que fazer
- Conceitos (curto):
  - Micro Frontends: dividir frontend em módulos independentes, cada um responsável por uma feature.
  - Module Federation: compartilhar módulos entre aplicações sem duplicação.
  - Comunicação: eventos customizados, shared state ou APIs.
  - Benefícios: times independentes, deploy separado, escalabilidade.
- Hands-on:
  - Configurar Vite com Module Federation no projeto principal.
  - Criar módulo separado "cart-payment-module" com telas de carrinho e pagamento.
  - Implementar comunicação via eventos customizados (ex: adicionar item ao carrinho).
  - Integrar o módulo na aplicação principal.
  - Exercício prático: simular checkout completo com comunicação bidirecional.

Exemplo — Configuração Module Federation em vite.config.ts
```ts
// filepath: frontend/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host-app',
      remotes: {
        cartModule: 'http://localhost:5174/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
})
```

- No módulo: expor componentes via federation.

Dicas de comando
- Instalar plugin: `npm install @originjs/vite-plugin-federation`
- Rodar módulo: `npm run dev` (porta diferente)
- Build: `npm run build` para ambos

Critérios de aceitação
- Você cria um módulo MFE com carrinho e pagamento.
- Implementa comunicação entre módulo e app principal (ex: eventos).
- A aplicação funciona integrada, simulando fluxo de compra.

## Implementação do Módulo
- Criar pasta `frontend/cart-payment-module/` com sua própria estrutura.
- Componentes: Cart.tsx, Payment.tsx.
- Comunicação: usar CustomEvent para enviar dados entre módulos.