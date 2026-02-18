import { useState, useEffect } from 'react';
import axios from 'axios';
import PriceCard from '../components/PriceCard';

const MANUAL_EXCHANGE_RATES = {
  SYP: 12500,
  LBP: 89500
};

function GoldPage({ baseCurrency }) {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoldPrices = async () => {
      try {
        setLoading(true);
        setError(null);

        const isManualCurrency = ['SYP', 'LBP'].includes(baseCurrency);
        const apiCurrency = isManualCurrency ? 'USD' : baseCurrency;

        const response = await axios.get(`https://www.goldapi.io/api/XAU/${apiCurrency}`, {
          headers: {
            'x-access-token': import.meta.env.VITE_GOLD_API_KEY
          }
        });

        let goldPrice = response.data.price;
        let silverPrice = response.data.price / 80;

        if (isManualCurrency) {
          const rate = MANUAL_EXCHANGE_RATES[baseCurrency];
          goldPrice = goldPrice * rate;
          silverPrice = silverPrice * rate;
        }

        const finalData = [
          { 
            id: 1, 
            name: "أونصة الذهب", 
            symbol: "XAU", 
            price: goldPrice, 
            change: response.data.chg_pct || 0 
          },
          { 
            id: 2, 
            name: "غرام الذهب (24)", 
            symbol: "24K", 
            price: goldPrice / 31.1035,
            change: response.data.chg_pct || 0 
          },
          { 
            id: 3, 
            name: "أونصة الفضة", 
            symbol: "XAG", 
            price: silverPrice, 
            change: 0.5 
          }
        ];

        setPrices(finalData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("عذراً، حدث خطأ أثناء جلب البيانات. تأكد من اتصالك بالإنترنت أو مفتاح الـ API.");
        setLoading(false);
      }
    };

    fetchGoldPrices();
  }, [baseCurrency]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
        <span className="mr-3 text-slate-600 font-bold">جاري تحديث الأسعار...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-rose-50 text-rose-600 p-4 rounded-xl inline-block font-bold border border-rose-100">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen dir-rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-r-4 border-emerald-500 pr-4">
          <h1 className="text-3xl font-black text-slate-800">أسعار المعادن الثمينة</h1>
          <p className="text-slate-500 font-medium">
            عرض حي لأسعار السوق العالمية مقابل <span className="text-emerald-600">{baseCurrency}</span>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prices.map((item) => (
            <PriceCard 
              key={item.id}
              name={item.name}
              price={item.price}
              symbol={item.symbol}
              change={item.change}
              baseCurrency={baseCurrency}
            />
          ))}
        </div>
        
        {['SYP', 'LBP'].includes(baseCurrency) && (
          <div className="mt-8 text-sm text-slate-400 bg-slate-100 p-3 rounded-lg text-center">
            * ملاحظة: يتم حساب السعر بناءً على متوسط أسعار صرف السوق الموازية لليرة.
          </div>
        )}
      </div>
    </div>
  );
}

export default GoldPage;