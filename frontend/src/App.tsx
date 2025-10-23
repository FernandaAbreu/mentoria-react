import { useState } from 'react';

type ResponseData = {
  message: string;
};

function App() {
  const [response, setResponse] = useState<string>('Clique em um botão para testar');

  const fetchData = async (endpoint: string) => {
    try {
      const res = await fetch(`http://localhost:4000/${endpoint}`);
      const data: ResponseData = await res.json();
      setResponse(`✅ Resposta: ${data.message}`);
    } catch (err) {
      setResponse(`❌ Erro: ${(err as Error).message}`);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Teste de CORS (React + TypeScript)</h1>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => fetchData('sem-cors')}>🔴 Chamar /sem-cors</button>
        <button onClick={() => fetchData('com-cors')} style={{ marginLeft: 10 }}>
          🟢 Chamar /com-cors
        </button>
        <button onClick={() => fetchData('cors-restrito')} style={{ marginLeft: 10 }}>
          🟡 Chamar /cors-restrito
        </button>
      </div>

      <pre>{response}</pre>
    </div>
  );
}

export default App;
