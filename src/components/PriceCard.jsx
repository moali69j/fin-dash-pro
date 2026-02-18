function PriceCard({ name, price, symbol, change }) {
  const isPositive = change > 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-100 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-slate-700 text-lg">{name}</h3>
        <span className="text-slate-400 font-mono">{symbol}</span>
      </div>
      <div className="text-2xl font-bold text-slate-900 mb-2">
        {price.toLocaleString()}
      </div>
      <div className={`text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
        {isPositive ? '▲' : '▼'} {Math.abs(change)}%
      </div>
    </div>
  );
}

export default PriceCard;