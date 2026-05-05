import React, { useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleAddToCart = (event: CustomEvent<CartItem>) => {
      setItems(prev => [...prev, event.detail]);
    };

    window.addEventListener('addToCart', handleAddToCart as EventListener);

    return () => {
      window.removeEventListener('addToCart', handleAddToCart as EventListener);
    };
  }, []);

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Carrinho</h2>
      {items.length === 0 ? (
        <p>Carrinho vazio</p>
      ) : (
        <ul>
          {items.map(item => (
            <li key={item.id}>
              {item.name} - R$ {item.price}
              <button onClick={() => removeItem(item.id)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total: R$ {total}</p>
      <button onClick={() => window.dispatchEvent(new CustomEvent('checkout', { detail: { items, total } }))}>
        Finalizar Compra
      </button>
    </div>
  );
};

export default Cart;