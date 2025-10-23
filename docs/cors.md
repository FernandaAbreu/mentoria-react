🚧 CORS = Cross-Origin Resource Sharing

🔒 É uma política de segurança do navegador:
    O navegador BLOQUEIA requisições entre ORIGENS diferentes
    (por exemplo: frontend em localhost:3000 → backend em localhost:4000)

✅ O backend precisa dar permissão explícita para isso acontecer.

🧠 QUEM RESOLVE O PROBLEMA DE CORS?

🖥️ Frontend:     ❌ NÃO RESOLVE

🔙 Backend:       ✅ SIM, É RESPONSÁVEL

O backend precisa responder com os cabeçalhos:

Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, etc.
Access-Control-Allow-Headers: Content-Type, Authorization, etc.

| Função                           | Frontend 🧑‍💻 | Backend 🖥️                           |
| -------------------------------- | -------------- | ------------------------------------- |
| Identifica chamadas cross-origin | ✅ Sim          | –                                     |
| Lida com erros de CORS no fetch  | ✅ Sim          | –                                     |
| Define as regras de CORS         | ❌ Não          | ✅ Sim (com headers)                   |
| Libera origens específicas       | ❌ Não          | ✅ Sim (`Access-Control-Allow-Origin`) |
| Processa preflight (OPTIONS)     | ❌ Não          | ✅ Sim                                 |


## Exemplo visual de erro

Frontend: localhost:3000
Backend:  localhost:4000

fetch('http://localhost:4000/sem-cors') → ❌ BLOQUEADO

Erro no navegador:
Access to fetch at 'http://localhost:4000/sem-cors'
from origin 'http://localhost:3000'
has been blocked by CORS policy.


## Como o backend resolve

// Express + CORS
import cors from 'cors';

// Liberar tudo (não recomendado em produção)
app.use(cors());

// Ou permitir só localhost:3000
app.use(cors({
  origin: 'http://localhost:3000'
}));

## O que o frontend deve saber?

📌 O Frontend deve:

✅ Entender que está fazendo uma chamada cross-origin
✅ Saber que erros de CORS vêm do navegador, não do backend
✅ Lidar com o erro de forma clara (exibir mensagem para o usuário)
❌ Não tentar burlar com 'no-cors' ou extensões
