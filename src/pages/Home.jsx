import { useNavigate } from 'react-router-dom';
import { events, getFeaturedEvents } from '../data/mockEvents';
import EventCard from '../components/EventCard';

export default function Home() {
  const navigate = useNavigate();
  const featured = getFeaturedEvents();

  return (
    <main id="home-page" data-cy="home-page">
      {/* Hero */}
      <section id="hero" data-cy="hero" className="gradient-hero ticket-pattern relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-36 text-center relative z-10">
          <span
            id="hero-badge"
            data-cy="hero-badge"
            className="inline-block bg-purple-700/30 border border-purple-500/40 text-purple-300 text-sm font-semibold px-4 py-2 rounded-full mb-6"
          >
            🎉 Os melhores shows do Brasil
          </span>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            Sua experiência{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              inesquecível
            </span>{' '}
            começa aqui
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Os ingressos para os melhores shows, festivais e eventos do Brasil com segurança, praticidade e os melhores preços.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              id="hero-cta-primary"
              data-cy="hero-cta-primary"
              onClick={() => navigate('/eventos')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-2xl shadow-purple-900/50 hover:scale-105"
            >
              🎫 Ver Todos os Eventos
            </button>
            <button
              id="hero-cta-secondary"
              data-cy="hero-cta-secondary"
              onClick={() => navigate('/contato')}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-200 backdrop-blur-sm"
            >
              Fale Conosco
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {[
              { value: '500+', label: 'Eventos realizados' },
              { value: '1M+', label: 'Ingressos vendidos' },
              { value: '4.9★', label: 'Avaliação média' },
              { value: '100%', label: 'Segurança garantida' },
            ].map((stat) => (
              <div
                key={stat.label}
                id={`stat-${stat.label.replace(/\s+/g, '-').toLowerCase()}`}
                data-cy="hero-stat"
                className="text-center"
              >
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative orbs */}
        <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-pink-700/15 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Featured Events */}
      <section id="featured-events" data-cy="featured-events" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-white text-3xl font-black">Eventos em Destaque</h2>
            <p className="text-gray-400 mt-1">Os shows mais esperados do momento</p>
          </div>
          <button
            id="see-all-events-btn"
            data-cy="see-all-events-btn"
            onClick={() => navigate('/eventos')}
            className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            Ver todos →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section id="categories" data-cy="categories" className="bg-[#0d0d18] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-white text-3xl font-black mb-8 text-center">Navegue por Categoria</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[
              { name: 'Rock', emoji: '🎸', color: 'from-red-700 to-orange-700' },
              { name: 'Sertanejo', emoji: '🤠', color: 'from-yellow-700 to-amber-700' },
              { name: 'Eletrônica', emoji: '🎧', color: 'from-blue-700 to-cyan-700' },
              { name: 'Pagode', emoji: '🥁', color: 'from-green-700 to-teal-700' },
              { name: 'Forró', emoji: '🪗', color: 'from-pink-700 to-rose-700' },
              { name: 'MPB', emoji: '🎶', color: 'from-purple-700 to-violet-700' },
            ].map((cat) => (
              <button
                key={cat.name}
                id={`category-${cat.name.toLowerCase()}`}
                data-cy="category-btn"
                data-category={cat.name}
                onClick={() => navigate(`/eventos?categoria=${cat.name.toLowerCase()}`)}
                className={`bg-gradient-to-br ${cat.color} p-6 rounded-2xl flex flex-col items-center gap-3 hover:scale-105 transition-transform duration-200 group`}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <span className="text-white font-semibold text-sm">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trust section */}
      <section id="trust-section" data-cy="trust-section" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-white text-3xl font-black mb-12 text-center">Por que escolher a ShowTickets?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: '🔒', title: 'Compra Segura', desc: 'Criptografia SSL e proteção total dos seus dados pessoais e financeiros.' },
            { icon: '⚡', title: 'Entrega Imediata', desc: 'Seu ingresso chega no e-mail em segundos após a confirmação do pagamento.' },
            { icon: '🎯', title: 'Melhor Preço', desc: 'Garantimos os melhores preços sem taxas escondidas e com transparência total.' },
            { icon: '🤝', title: 'Suporte 24/7', desc: 'Nossa equipe está sempre disponível para resolver qualquer dúvida ou problema.' },
          ].map((item) => (
            <div
              key={item.title}
              id={`trust-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
              data-cy="trust-card"
              className="bg-[#13131f] border border-purple-900/30 rounded-2xl p-6 text-center hover:border-purple-600/40 transition-colors"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* All events preview */}
      <section id="all-events-preview" data-cy="all-events-preview" className="bg-[#0d0d18] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-3xl font-black">Próximos Eventos</h2>
            <button
              id="see-all-btn-bottom"
              data-cy="see-all-btn-bottom"
              onClick={() => navigate('/eventos')}
              className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors"
            >
              Ver todos →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {events.slice(1).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section id="cta-banner" data-cy="cta-banner" className="gradient-hero py-20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-white text-4xl font-black mb-4">Pronto para viver o momento?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Não perca os ingressos dos melhores shows do Brasil. Garanta o seu agora!
          </p>
          <button
            id="final-cta-btn"
            data-cy="final-cta-btn"
            onClick={() => navigate('/eventos')}
            className="bg-white text-purple-900 hover:bg-gray-100 font-black px-10 py-4 rounded-2xl text-lg transition-all duration-200 shadow-2xl hover:scale-105"
          >
            🎫 Garantir Meu Ingresso
          </button>
        </div>
      </section>
    </main>
  );
}
