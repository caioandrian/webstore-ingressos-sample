import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { storage } from '../utils/localStorage';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const orders = storage.getOrders();

  const navItems = [
    { to: '/', label: 'Início', id: 'nav-home' },
    { to: '/eventos', label: 'Eventos', id: 'nav-eventos' },
    { to: '/meus-ingressos', label: 'Meus Ingressos', id: 'nav-meus-ingressos' },
    { to: '/contato', label: 'Contato', id: 'nav-contato' },
  ];

  return (
    <header id="header" data-cy="header" className="sticky top-0 z-50 bg-[#0f0f1a]/95 backdrop-blur-sm border-b border-purple-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            id="logo-btn"
            data-cy="logo"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-900/50">
              ST
            </div>
            <span className="text-white font-bold text-xl tracking-tight hidden sm:block">
              Show<span className="text-purple-400">Tickets</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav id="desktop-nav" data-cy="desktop-nav" className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                id={item.id}
                data-cy={item.id}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-700/30 text-purple-300'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.label}
                {item.to === '/meus-ingressos' && orders.length > 0 && (
                  <span
                    id="orders-badge"
                    data-cy="orders-badge"
                    className="ml-2 bg-purple-600 text-white text-xs rounded-full px-1.5 py-0.5"
                  >
                    {orders.length}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA + Mobile menu */}
          <div className="flex items-center gap-3">
            <button
              id="buy-tickets-cta"
              data-cy="buy-tickets-cta"
              onClick={() => navigate('/eventos')}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-purple-900/40"
            >
              <span>🎫</span>
              Comprar Ingressos
            </button>

            <button
              id="mobile-menu-btn"
              data-cy="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div id="mobile-menu" data-cy="mobile-menu" className="md:hidden pb-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                id={`mobile-${item.id}`}
                data-cy={`mobile-${item.id}`}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-purple-700/30 text-purple-300'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {item.label}
                {item.to === '/meus-ingressos' && orders.length > 0 && (
                  <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-0.5">
                    {orders.length}
                  </span>
                )}
              </NavLink>
            ))}
            <button
              id="mobile-buy-btn"
              data-cy="mobile-buy-btn"
              onClick={() => { navigate('/eventos'); setMenuOpen(false); }}
              className="w-full mt-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-all"
            >
              🎫 Comprar Ingressos
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
