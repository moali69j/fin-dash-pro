import { useState, useEffect } from 'react';
import axios from 'axios';
import PriceCard from '../components/PriceCard';

const MANUAL_EXCHANGE_RATES = {
  SYP: 15500,
  LBP: 89500
};

function CryptoPage({ baseCurrency }) {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        setLoading(true);
        const isManualCurrency = ['SYP', 'LBP'].includes(baseCurrency);
        const apiCurrency = isManualCurrency ? 'usd' : baseCurrency.toLowerCase();

        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets`, {
            params: {
              vs_currency: apiCurrency,
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false
            }
          }
        );

        let finalCoins = response.data;
        if (isManualCurrency) {
          const rate = MANUAL_EXCHANGE_RATES[baseCurrency];
          finalCoins = response.data.map(coin => ({
            ...coin,
            current_price: coin.current_price * rate
          }));
        }

        setCoins(finalCoins);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchCrypto();
  }, [baseCurrency]);

  if (loading) return <div className="p-8 text-center animate-pulse text-emerald-600">جاري جلب أسعار الكريبتو...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-r-4 border-orange-500 pr-4">
          <h1 className="text-3xl font-black text-slate-800">سوق العملات الرقمية</h1>
          <p className="text-slate-500 font-medium">الأسعار المباشرة مقابل {baseCurrency}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coins.map((coin) => (
            <PriceCard 
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol.toUpperCase()}
              change={coin.price_change_percentage_24h}
              baseCurrency={baseCurrency}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CryptoPage;