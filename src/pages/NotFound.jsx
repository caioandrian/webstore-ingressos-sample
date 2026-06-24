import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <main id="not-found-page" data-cy="not-found-page" className="flex-1 flex items-center justify-center px-4 py-24">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-6">🎭</div>
        <h1 className="text-white text-5xl font-black mb-3">404</h1>
        <h2 className="text-gray-300 text-2xl font-bold mb-4">Página não encontrada</h2>
        <p className="text-gray-400 text-lg mb-8">
          Parece que esse show foi cancelado! A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            id="go-home-btn"
            data-cy="go-home-btn"
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-3 rounded-xl transition-all hover:scale-105"
          >
            Ir para o Início
          </button>
          <button
            id="go-events-404-btn"
            data-cy="go-events-404-btn"
            onClick={() => navigate('/eventos')}
            className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:bg-white/20"
          >
            Ver Eventos
          </button>
        </div>
      </div>
    </main>
  );
}
