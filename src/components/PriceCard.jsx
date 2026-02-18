function PriceCard({ name, price, symbol, change, baseCurrency }) {
 
  const isPositive = change >= 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow dir-rtl text-right">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800 text-xl">{name}</h3>
        <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-md font-mono">
          {symbol}
        </span>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-3xl font-black text-slate-900">
          {price.toLocaleString()}
        </span>
        <span className="text-slate-500 font-medium text-sm">
          {baseCurrency}
        </span>
      </div>

      <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
        <span>{isPositive ? '▲' : '▼'}</span>
        <span>{Math.abs(change)}%</span>
        <span className="text-slate-400 font-normal mr-auto">آخر 24 ساعة</span>
      </div>
    </div>
  );
}

export default PriceCard;