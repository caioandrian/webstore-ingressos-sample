import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Events from './pages/Events';
import Purchase from './pages/Purchase';
import MyTickets from './pages/MyTickets';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Automacao from './pages/Automacao';

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <div id="app" data-cy="app" className="flex flex-col min-h-screen">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/comprar/:eventId" element={<Purchase />} />
              <Route path="/meus-ingressos" element={<MyTickets />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/perfil" element={<Profile />} />
              <Route path="/automacao" element={<Automacao />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
}
