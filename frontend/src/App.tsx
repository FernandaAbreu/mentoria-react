import i18n from './i18n'; // importa e inicializa i18next antes de usar useTranslation
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';

type ResponseData = {
  message: string;
};

// importa a configuração/inicialização do i18n (carrega src/i18n/index.ts)

function App() {
  const { t } = useTranslation();
  // Inicializa vazio e mantém sincronizado com o idioma via useEffect
  const [response, setResponse] = useState<string>('');

  const fetchData = async (endpoint: string) => {
    try {
      const res = await fetch(`http://localhost:4000/${endpoint}`);
      const data: ResponseData = await res.json();
      setResponse(`✅ ${data.message}`);
    } catch (err) {
      setResponse(`❌ ${(err as Error).message}`);
    }
  };

  const changeLanguage = (lang: 'pt' | 'en') => {
    i18n.changeLanguage(lang); // usa o i18n importado
  };

  // Atualiza o placeholder/resposta quando o idioma mudar
  useEffect(() => {
    setResponse(t('resultPlaceholder'));
  }, [t, i18n.language]); // i18n aqui é o import acima

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      {/* 🌐 Bandeiras de idioma */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <button
          onClick={() => changeLanguage('pt')}
          disabled={i18n.language === 'pt'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            marginRight: 10,
            opacity: i18n.language === 'pt' ? 0.5 : 1,
          }}
          title="Português"
        >
          <ReactCountryFlag countryCode="BR" svg style={{ fontSize: '2rem' }} />
        </button>

        <button
          onClick={() => changeLanguage('en')}
          disabled={i18n.language === 'en'}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: i18n.language === 'en' ? 0.5 : 1,
          }}
          title="English"
        >
          <ReactCountryFlag countryCode="US" svg style={{ fontSize: '2rem' }} />
        </button>
      </div>

      {/* 🧩 Conteúdo principal */}
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => fetchData('sem-cors')}>{t('buttonSemCORS')}</button>
        <button onClick={() => fetchData('com-cors')} style={{ marginLeft: 10 }}>
          {t('buttonComCORS')}
        </button>
        <button onClick={() => fetchData('cors-restrito')} style={{ marginLeft: 10 }}>
          {t('buttonCorsRestrito')}
        </button>
      </div>

      <pre style={{ marginTop: 20 }}>{response}</pre>
    </div>
  );
}

export default App;
