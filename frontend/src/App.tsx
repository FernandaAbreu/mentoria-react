import i18n from './i18n'; // importa e inicializa i18next antes de usar useTranslation
import { useState, useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';

type ResponseData = {
  message: string;
};

// Lazy load remote components
const Cart = lazy(() => import('cartModule/Cart'));
const Payment = lazy(() => import('cartModule/Payment'));

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

  const products = [
    { id: 1, name: 'Produto 1', price: 10 },
    { id: 2, name: 'Produto 2', price: 20 },
  ];

  const addToCart = (product: { id: number; name: string; price: number }) => {
    window.dispatchEvent(new CustomEvent('addToCart', { detail: product }));
  };

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

      {/* MFE Section */}
      <h2>Micro Frontends - Carrinho e Pagamento</h2>
      <div>
        <h3>Produtos</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - R$ {product.price}
              <button onClick={() => addToCart(product)}>Adicionar ao Carrinho</button>
            </li>
          ))}
        </ul>
      </div>
      <Suspense fallback={<div>Loading Cart...</div>}>
        <Cart />
      </Suspense>
      <Suspense fallback={<div>Loading Payment...</div>}>
        <Payment />
      </Suspense>
    </div>
  );
}

export default App;
