import { useState, useEffect } from 'react';
import axios from 'axios';
import PriceCard from '../components/PriceCard';

function ForexPage({ baseCurrency }) {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);

  const trackedCurrencies = ['USD', 'EUR', 'GBP', 'SAR', 'AED', 'EGP', 'TRY', 'SYP', 'LBP'];

  useEffect(() => {
    const fetchForex = async () => {
      try {
        setLoading(true);
        
        const isManual = ['SYP', 'LBP'].includes(baseCurrency);
        const apiBase = isManual ? 'USD' : baseCurrency;

        const response = await axios.get(`https://v6.exchangerate-api.com/v6/79de9c41b90548e23f4545b1/latest/${apiBase}`);
        
        const allRates = response.data.conversion_rates;

        const filteredRates = trackedCurrencies
          .filter(symbol => symbol !== baseCurrency)
          .map((symbol, index) => {
            let price = allRates[symbol] ? (1 / allRates[symbol]) : 0;
            
            if (isManual) {
               const manualRate = baseCurrency === 'SYP' ? 12100 : 89500;
               price = (1 / allRates[symbol]) * manualRate;
            }

            return {
              id: index,
              name: `سعر ${symbol}`,
              symbol: symbol,
              price: price,
              change: 0.1
            };
          });

        setRates(filteredRates);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchForex();
  }, [baseCurrency]);

  if (loading) return <div className="p-8 text-center text-emerald-600 font-bold">جاري تحديث أسعار الصرف...</div>;

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-r-4 border-blue-500 pr-4">
          <h1 className="text-3xl font-black text-slate-800">سوق العملات العالمي (Forex)</h1>
          <p className="text-slate-500 font-medium">سعر صرف العملات العالمية مقابل {baseCurrency}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rates.map((rate) => (
            <PriceCard 
              key={rate.id}
              name={rate.name}
              price={rate.price}
              symbol={rate.symbol}
              change={rate.change}
              baseCurrency={baseCurrency}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ForexPage;