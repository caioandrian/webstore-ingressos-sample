import { useNavigate } from 'react-router-dom';

export default function EventCard({ event, featured = false }) {
  const navigate = useNavigate();

  return (
    <article
      id={`event-card-${event.id}`}
      data-cy="event-card"
      data-event-id={event.id}
      className={`group relative bg-[#13131f] border border-purple-900/30 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-purple-600/50 hover:shadow-2xl hover:shadow-purple-900/30 ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-72' : 'h-48'}`}>
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13131f] via-[#13131f]/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span
            id={`event-category-${event.id}`}
            data-cy="event-category"
            className="bg-purple-700/80 backdrop-blur-sm text-purple-100 text-xs font-semibold px-3 py-1 rounded-full"
          >
            {event.category}
          </span>
          {event.featured && (
            <span className="bg-pink-600/80 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
              ⭐ Destaque
            </span>
          )}
          {event.soldOut && (
            <span
              id={`event-soldout-${event.id}`}
              data-cy="event-soldout"
              className="bg-red-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full"
            >
              Esgotado
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          id={`event-title-${event.id}`}
          data-cy="event-title"
          className="text-white font-bold text-lg leading-tight mb-1 line-clamp-2"
        >
          {event.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-1">{event.subtitle}</p>

        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-purple-400">📅</span>
            <span id={`event-date-${event.id}`} data-cy="event-date">
              {event.dateFormatted} às {event.time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <span className="text-purple-400">📍</span>
            <span id={`event-venue-${event.id}`} data-cy="event-venue">
              {event.venue} — {event.city}
            </span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-xs">A partir de</p>
            <p
              id={`event-price-${event.id}`}
              data-cy="event-price"
              className="text-white font-bold text-xl"
            >
              {event.soldOut
                ? '—'
                : `R$ ${Math.min(...event.tickets.map((t) => t.price)).toFixed(2).replace('.', ',')}`}
            </p>
          </div>

          <button
            id={`event-buy-btn-${event.id}`}
            data-cy="event-buy-btn"
            onClick={() => navigate(event.soldOut ? `/eventos/${event.id}` : `/comprar/${event.id}`)}
            disabled={event.soldOut}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              event.soldOut
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50'
            }`}
          >
            {event.soldOut ? 'Esgotado' : 'Comprar'}
          </button>
        </div>
      </div>
    </article>
  );
}
