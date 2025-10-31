# Roadmap da Mentoria — Temas e Exercícios

Objetivo: guiar as próximas mentorias com tópicos práticos, exercícios e recursos.

1) Identificar problemas de CORS
- Descrição: conceitos de Same-Origin Policy, preflight (OPTIONS), cabeçalhos relevantes (Access-Control-Allow-Origin, Methods, Headers).
- Exercícios:
  - Reproduzir erro CORS com endpoint sem header e corrigi-lo adicionando header apropriado.
  - Implementar endpoint com CORS restrito a uma origem específica.
- Duração sugerida: 1 sessão (1h).

2) Testes unitários
- Descrição: por que testar, diferenças entre unit/integration/e2e, TDD rápido.
- Ferramentas: Vitest + Testing Library (frontend), Jest (backend/Nest/Express).
- Exercícios:
  - Criar testes para componente React que muda idioma.
  - Escrever testes para service do backend que retorna mensagens.
- Duração sugerida: 1–2 sessões.

3) Ferramentas de build em aplicações web (Webpack / Rollup)
- Descrição: bundling, minificação, tree-shaking, code-splitting.
- Exercícios:
  - Comparar bundle gerado por Vite (Rollup) e Webpack em um pequeno app.
  - Habilitar tree-shaking e analisar resultado (bundle size).
- Recursos: documentação oficial Webpack e Rollup; Chrome DevTools Coverage.
- Duração sugerida: 1 sessão.

4) Microfrontends (MFE)
- Descrição: motivação, arquitetura (multiple teams, deploy independente), estratégias de integração (iframes, runtime composition).
- Exercícios:
  - Criar duas pequenas apps e integrá-las via iframe e via import dinâmico.
  - Discutir trade-offs (latência, isolamento, compartilhamento de dependências).
- Duração sugerida: 1–2 sessões.

5) Module Federation e Web Components
- Descrição: Module Federation (Webpack) para compartilhamento/consumo de módulos em runtime; Web Components para encapsulamento e compatibilidade.
- Exercícios:
  - Exemplo mínimo de Module Federation expondo um componente React.
  - Empacotar um componente como Web Component e consumir numa app host.
- Recursos: docs Module Federation, docs Web Components.
- Duração sugerida: 1–2 sessões.

6) AWS para exposição de frontends (S3, API Gateway, CDN)
- Descrição: deploy estático em S3, distribuição via CloudFront (CDN), expor APIs via API Gateway + Lambda (ou ALB).
- Exercícios:
  - Deployar build estático em S3 e configurar CloudFront.
  - Criar rota no API Gateway que encaminhe para um backend simples.
- Duração sugerida: 1 sessão prática + configuração.

Recursos gerais e formato
- Duração de cada mentoria: 60–90 minutos (teoria curta + hands-on).
- Formato: 20–30 min teoria, 30–45 min hands-on, 10–15 min revisão e tarefas.
- Links úteis:
  - MDN Web Docs (CORS, Same-Origin Policy)
  - Vite / Rollup / Webpack docs
  - Webpack Module Federation examples
  - AWS docs (S3, CloudFront, API Gateway)

Observação: posso transformar cada tópico em um checklist detalhado com tarefas passo a passo e exemplos de código para deixar pronto antes das mentorias. Deseja que eu gere checklists individuais para cada sessão?
