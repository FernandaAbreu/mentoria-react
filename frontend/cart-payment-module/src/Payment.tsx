import React, { useState, useEffect } from 'react';

interface CheckoutData {
  items: Array<{ id: number; name: string; price: number }>;
  total: number;
}

const Payment: React.FC = () => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  useEffect(() => {
    const handleCheckout = (event: CustomEvent<CheckoutData>) => {
      setCheckoutData(event.detail);
    };

    window.addEventListener('checkout', handleCheckout as EventListener);

    return () => {
      window.removeEventListener('checkout', handleCheckout as EventListener);
    };
  }, []);

  const handlePayment = () => {
    alert('Pagamento simulado realizado com sucesso!');
    setCheckoutData(null);
    window.dispatchEvent(new CustomEvent('paymentSuccess'));
  };

  if (!checkoutData) {
    return <p>Aguardando checkout...</p>;
  }

  return (
    <div>
      <h2>Pagamento</h2>
      <p>Total a pagar: R$ {checkoutData.total}</p>
      <ul>
        {checkoutData.items.map(item => (
          <li key={item.id}>{item.name} - R$ {item.price}</li>
        ))}
      </ul>
      <button onClick={handlePayment}>Pagar</button>
    </div>
  );
};

export default Payment;