import { Link } from 'react-router-dom';

function HomePage({ baseCurrency }) {
  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
       
        <header className="mb-12 text-center py-10 bg-gradient-to-l from-slate-900 to-slate-800 rounded-3xl text-white shadow-xl">
          <h1 className="text-4xl font-black mb-4">أهلاً بك في اللوحة المالية الشاملة</h1>
          <p className="text-slate-300 text-lg">متابعة دقيقة للأسواق العالمية مقابل {baseCurrency}</p>
        </header>

    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
         
          <Link to="/gold" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-emerald-500 transition-all">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">✨</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">المعادن الثمينة</h2>
            <p className="text-slate-500 text-sm">أسعار الذهب والفضة لحظة بلحظة.</p>
          </Link>

          <Link to="/forex" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-500 transition-all">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💵</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">الفوركس</h2>
            <p className="text-slate-500 text-sm">تحويل العملات وأسعار الصرف العالمية.</p>
          </Link>

        
          <Link to="/crypto" className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:border-orange-500 transition-all">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🪙</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">العملات الرقمية</h2>
            <p className="text-slate-500 text-sm">متابعة البيتكوين وأشهر العملات الرقمية.</p>
          </Link>

        </div>

        
        
      </div>
    </div>
  );
}

export default HomePage;
