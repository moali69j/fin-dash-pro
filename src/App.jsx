import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import GoldPage from "./pages/GoldPage";
import ForexPage from "./pages/ForexPage";
import CryptoPage from "./pages/CryptoPage";
import "./index.css";

function App() {
  const [baseCurrency, setBaseCurrency] = useState("USD");

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-lg sticky top-0 z-50" dir="rtl">
          <div className="flex gap-6 items-center">
            <Link to="/" className="text-xl font-black text-emerald-500 ml-4">MO FINANCE</Link>
            
            <Link to="/gold" className="hover:text-emerald-400 transition text-sm md:text-base">
              الذهب والفضة
            </Link>
            <Link to="/forex" className="hover:text-emerald-400 transition text-sm md:text-base">
              العملات
            </Link>
            <Link to="/crypto" className="hover:text-emerald-400 transition text-sm md:text-base">
              العملات الرقمية
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-400 font-medium hidden md:inline">
              اختر عملة بلدك:
            </span>
            <select
              value={baseCurrency}
              onChange={(e) => setBaseCurrency(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-emerald-400 rounded-lg px-3 py-1.5 outline-none focus:border-emerald-500 cursor-pointer transition-all shadow-inner text-sm"
            >
              <option value="USD">الدولار الأمريكي ($)</option>
              <option value="EUR">اليورو (€)</option>
              <option value="GBP">الجنيه الإسترليني (£)</option>
              <option value="SAR">الريال السعودي (ر.س)</option>
              <option value="SYP">الليرة السورية (ل.س)</option>
              <option value="LBP">الليرة اللبنانية (ل.ل)</option>
              <option value="AED">الدرهم الإماراتي (د.إ)</option>
              <option value="EGP">الجنيه المصري (ج.م)</option>
              <option value="KWD">الدينار الكويتي (د.ك)</option>
              <option value="QAR">الريال القطري (ر.ق)</option>
              <option value="JOD">الدينار الأردني (د.أ)</option>
              <option value="MAD">الدرهم المغربي (د.م)</option>
              <option value="TRY">الليرة التركية (₺)</option>
            </select>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage baseCurrency={baseCurrency} />} />
          <Route path="/gold" element={<GoldPage baseCurrency={baseCurrency} />} />
          <Route path="/forex" element={<ForexPage baseCurrency={baseCurrency} />} />
          <Route path="/crypto" element={<CryptoPage baseCurrency={baseCurrency} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;