import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { events } from '../data/mockEvents';
import EventCard from '../components/EventCard';

const CATEGORIES = ['Todas', 'Rock', 'Sertanejo', 'Eletrônica', 'Pagode', 'Forró', 'MPB'];

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const catParam = searchParams.get('categoria') || 'todas';
  const [selectedCat, setSelectedCat] = useState(
    CATEGORIES.find((c) => c.toLowerCase() === catParam) || 'Todas'
  );
  const [showSoldOut, setShowSoldOut] = useState(true);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchCat = selectedCat === 'Todas' || e.category === selectedCat;
      const matchSearch =
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.city.toLowerCase().includes(search.toLowerCase()) ||
        e.artists.some((a) => a.toLowerCase().includes(search.toLowerCase()));
      const matchSoldOut = showSoldOut || !e.soldOut;
      return matchCat && matchSearch && matchSoldOut;
    });
  }, [selectedCat, search, showSoldOut]);

  const handleCatChange = (cat) => {
    setSelectedCat(cat);
    if (cat === 'Todas') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', cat.toLowerCase());
    }
    setSearchParams(searchParams);
  };

  return (
    <main id="events-page" data-cy="events-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1
          id="events-page-title"
          data-cy="events-page-title"
          className="text-white text-4xl font-black mb-2"
        >
          Todos os Eventos
        </h1>
        <p className="text-gray-400 text-lg">Encontre o show perfeito para você</p>
      </div>

      {/* Filters */}
      <div id="events-filters" data-cy="events-filters" className="bg-[#13131f] border border-purple-900/30 rounded-2xl p-5 mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
          <input
            id="events-search"
            data-cy="events-search"
            type="text"
            placeholder="Buscar por evento, artista ou cidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0f0f1a] border border-purple-900/40 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          {search && (
            <button
              id="clear-search-btn"
              data-cy="clear-search-btn"
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`filter-cat-${cat.toLowerCase()}`}
              data-cy="filter-category-btn"
              data-category={cat}
              onClick={() => handleCatChange(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                selectedCat === cat
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-900/40'
                  : 'bg-[#1a1a2e] text-gray-300 hover:text-white hover:bg-purple-900/30 border border-purple-900/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sold out toggle */}
        <div className="flex items-center gap-3">
          <label id="soldout-toggle-label" htmlFor="soldout-toggle" className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                id="soldout-toggle"
                data-cy="soldout-toggle"
                type="checkbox"
                className="sr-only"
                checked={showSoldOut}
                onChange={(e) => setShowSoldOut(e.target.checked)}
              />
              <div
                onClick={() => setShowSoldOut(!showSoldOut)}
                className={`w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  showSoldOut ? 'bg-purple-600' : 'bg-gray-700'
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                    showSoldOut ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
            <span className="text-gray-300 text-sm">Mostrar eventos esgotados</span>
          </label>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p id="events-count" data-cy="events-count" className="text-gray-400 text-sm">
          <span className="text-white font-semibold">{filtered.length}</span> evento{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Events grid */}
      {filtered.length > 0 ? (
        <div id="events-grid" data-cy="events-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div id="no-events-found" data-cy="no-events-found" className="text-center py-24">
          <div className="text-6xl mb-4">🎭</div>
          <h3 className="text-white text-xl font-bold mb-2">Nenhum evento encontrado</h3>
          <p className="text-gray-400 mb-6">Tente ajustar os filtros ou limpar a busca.</p>
          <button
            id="clear-filters-btn"
            data-cy="clear-filters-btn"
            onClick={() => { setSearch(''); setSelectedCat('Todas'); setShowSoldOut(true); }}
            className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </main>
  );
}
