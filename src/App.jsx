import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import GoldPage from './pages/GoldPage';
import ForexPage from './pages/ForexPage';
import CryptoPage from './pages/CryptoPage';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="nav-links">
            <Link to="/">الذهب والفضة</Link>
            <Link to="/forex">العملات</Link>
            <Link to="/crypto">العملات الرقمية</Link>
          </div>
          
          <select 
            value={baseCurrency} 
            onChange={(e) => setBaseCurrency(e.target.value)}
            className="currency-select"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="SAR">SAR (﷼)</option>
            <option value="TRY">TRY (₺)</option>
          </select>
        </nav>

        <Routes>
          <Route path="/" element={<GoldPage baseCurrency={baseCurrency} />} />
          <Route path="/forex" element={<ForexPage baseCurrency={baseCurrency} />} />
          <Route path="/crypto" element={<CryptoPage baseCurrency={baseCurrency} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;