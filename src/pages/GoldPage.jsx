import PriceCard from '../components/PriceCard';

function GoldPage({ baseCurrency }) {
  
  const mockGoldData = [
    { id: 1, name: "الذهب (عيار 24)", symbol: "XAU", price: 2150.50, change: 1.2 },
    { id: 2, name: "الذهب (عيار 21)", symbol: "XAU", price: 1880.75, change: -0.5 },
    { id: 3, name: "الفضة", symbol: "XAG", price: 24.30, change: 2.1 },
  ];

  return (
    <div className="p-8 bg-slate-50 min-height-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-r-4 border-emerald-500 pr-4">
          <h1 className="text-3xl font-black text-slate-800">أسعار الذهب والفضة</h1>
          <p className="text-slate-500">متابعة حية لأسعار المعادن الثمينة مقابل {baseCurrency}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGoldData.map((item) => (
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
      </div>
    </div>
  );
}

export default GoldPage;