// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import './i18n/config';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-ocean-50 to-sand-100">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotel/:id" element={<HotelDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
