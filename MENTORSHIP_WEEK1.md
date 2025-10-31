# Semana 1 — Ferramentas de build (bundling e otimização)

Objetivo: entender bundlers, minificação, tree-shaking e gerar build de produção.

O que fazer
- Conceitos (curto):
  - Bundling: agrupar vários módulos em poucos arquivos para o navegador.
  - Minificação: reduzir tamanho removendo espaços/nomes.
  - Tree-shaking: remover código morto (não usado) durante o build.
  - Code-splitting: dividir o bundle para carregamento sob demanda.
- Hands-on:
  - Gerar build: `npm run build` (Vite) e inspecionar `dist`.
  - Analisar bundle: `npx source-map-explorer dist/assets/*.js` ou usar Chrome DevTools → Coverage.
  - Exercício prático: adicionar código não utilizado e verificar se tree-shaking o remove.

Exemplo — código para testar tree-shaking
```ts
// filepath: src/utils/unused.ts
export function usedFn() {
  return 'used';
}

export function unusedFn() {
  // função não usada — deve ser eliminada pelo tree-shaking
  console.log('não usada');
}
```
- Use apenas usedFn em sua app. Rode `npm run build` e verifique se `unusedFn` foi removida.

Dicas de comando
- Gerar build: `npm run build`
- Inspecionar bundle: `npx source-map-explorer dist/assets/*.js`  
- Servir build local: `npm run preview`

Critérios de aceitação
- Você gera o build e identifica o arquivo principal do bundle.
- Consegue explicar o que é tree-shaking e demonstrar evidência (arquivo menor / código removido).

## Como usar o Chrome DevTools para analisar bundles
1. Abrir DevTools: F12 ou Ctrl/Cmd+Shift+I.  
2. Network → filtrar por "JS": recarregue com "Disable cache" marcado para ver arquivos carregados.  
3. Sources → localizar bundle principal e sourcemaps.  
4. Coverage:
   - Command Menu (Ctrl/Cmd+Shift+P) → "Show Coverage".
   - "Start Instrumenting Coverage and Reload Page" para ver % used vs unused.
5. Performance / Lighthouse (analisar impacto)
   - Use Performance para gravar uma sessão e ver impacte de execução.
   - Use Lighthouse (Audits) para report de performance e oportunidades (JS size, unused code).

## Performance & Lighthouse (detalhado)
Objetivo: usar Lighthouse para identificar gargalos de performance, entender métricas-chave e priorizar melhorias.
Como rodar (DevTools)
- Abra Chrome DevTools → aba "Lighthouse".
- Escolha Device (Mobile / Desktop) e categorias (Performance, Best Practices, Accessibility, SEO).
- Clique em "Generate report" — o DevTools vai simular rede/CPU e gerar o relatório.
Como rodar (CLI)
- Exemplo: `npx lighthouse http://localhost:5173 --preset=desktop --output html --output-path ./lighthouse-report.html --view`
- Para integração contínua: veja `lighthouse-ci` (https://github.com/GoogleChrome/lighthouse-ci).
Principais métricas (o que olhar)
- First Contentful Paint (FCP): tempo até o primeiro conteúdo renderizado.
- Largest Contentful Paint (LCP): tempo até o maior elemento visível — afeta percepção de carregamento.
- Total Blocking Time (TBT): tempo de bloqueio do thread principal, correlaciona com responsividade.
- Cumulative Layout Shift (CLS): estabilidade visual (evitar saltos).
- Time to First Byte (TTFB): tempo de resposta do servidor.
Interpretação rápida do relatório
- "Opportunities": ações que podem reduzir bytes transferidos ou tempo de carregamento (ex.: remover código não usado, comprimir assets).
- "Diagnostics": informação técnica (ex.: long tasks, parse/compile time).
- "Passed audits": boas práticas já atendidas.
Ações práticas comuns (prioridade)
- Reduzir o JavaScript inicial: code-splitting e lazy-loading.
- Remover/treeshake código não usado; minificar e comprimir (gzip/br/ brotli).
- Adiar scripts não-críticos (defer/async) e minimizar main-thread work.
- Otimizar imagens (next-gen formats, dimensionamento correto) e usar caching/CDN.
- Configurar pré-conexões quando necessário (preconnect / preload).
Como iterar
- Faça uma mudança (ex.: lazy-load de um componente grande).
- Rode Lighthouse novamente (DevTools/CLI).
- Compare relatórios (diferença em LCP / TBT / total byte savings).
Links úteis
- Lighthouse docs: https://developer.chrome.com/docs/lighthouse/  
- Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci  
- PageSpeed Insights (web UI): https://developers.google.com/speed/pagespeed/insights/

## Webpack vs Rollup — comparação prática
Objetivo: entender rapidamente em que cenários cada ferramenta se destaca e quais características impactam seu exercício de semana 1.

Visão geral rápida
- Rollup:
  - Focado em bundling para bibliotecas e pacotes (cria bundles com menos overhead).
  - Gera bundles mais "limpos" para ES modules; ótimo tree-shaking por design.
  - Configuração mais simples para saída em formato de biblioteca (ESM/CJS/UMD).
  - Menos ênfase em loaders; plugins cobrem necessidades extras.
  - Comando típico (projeto com rollup.config.js): `npx rollup -c`

- Webpack:
  - Projetado para aplicações web (SPA) com suporte amplo a loaders (CSS, imagens, assets).
  - Excelente ecossistema: HMR, dev-server, code-splitting, Module Federation.
  - Mais flexível para casos complexos (asset pipeline, múltiplos entry points).
  - Configuração pode ser mais verbosa, mas permite soluções para muitas necessidades de app.
  - Comando típico (webpack.config.js): `npx webpack --mode production`

Prós / Contras (resumido)
- Rollup
  - + Saídas menores para bibliotecas; melhor tree-shaking.
  - + Configuração simples para bibliotecas.
  - - Menos integrado para manipulação complexa de assets (você precisa de plugins/loaders específicos).

- Webpack
  - + Extremamente flexível para aplicações: loaders, plugins, dev-server, HMR.
  - + Suporte a Module Federation para microfrontends.
  - - Configurações grandes/complexas; bundle inicial pode ser maior se não otimizado.

Quando escolher qual (relevante para seu exercício)
- Use Rollup se:
  - Você está construindo uma biblioteca/um pacote reutilizável ou quer bundles muito enxutos para exportar módulos.
  - Quer testar tree-shaking de forma direta e ver remoção de código morto com facilidade.

- Use Webpack (ou Vite que usa Rollup internamente para build) se:
  - Você está trabalhando numa aplicação (SPA) com muitos tipos de assets, HMR e necessidade de dev-server.
  - Precisa de funcionalidades avançadas como Module Federation ou loaders específicos.

Exemplo prático — comparar bundle size
1. Com Rollup (config simples):
   - adicionar `rollup.config.js` com input/output para ESM/CJS e rodar `npx rollup -c`.
2. Com Webpack (config simples):
   - adicionar `webpack.config.js` com entry/output e rodar `npx webpack --mode production`.
3. Gerar os dois builds e usar `npx source-map-explorer` ou Chrome Coverage para comparar tamanho e código não usado.

Links úteis
- Rollup: https://rollupjs.org/
- Webpack: https://webpack.js.org/
- Comparativo e artigo prático: https://web.dev/what-is-tree-shaking/ (bom para entender impacto no bundle)