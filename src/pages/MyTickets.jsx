import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/localStorage';
import { getEventById } from '../data/mockEvents';

function TicketCard({ order }) {
  const [expanded, setExpanded] = useState(false);
  const event = getEventById(order.event?.id);

  const totalTickets = Object.values(order.tickets || {}).reduce((s, v) => s + v, 0);

  return (
    <div
      id={`ticket-card-${order.id}`}
      data-cy="ticket-card"
      data-order-id={order.id}
      className="bg-[#13131f] border border-purple-900/30 rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex gap-4">
            {event?.image && (
              <img
                src={event.image}
                alt={order.event.title}
                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
              />
            )}
            <div>
              <span
                id={`order-status-${order.id}`}
                data-cy="order-status"
                className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1 ${
                  order.status === 'confirmed'
                    ? 'bg-green-900/30 text-green-400 border border-green-700/40'
                    : 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/40'
                }`}
              >
                {order.status === 'confirmed' ? '✓ Confirmado' : 'Pendente'}
              </span>
              <h3
                id={`order-event-title-${order.id}`}
                data-cy="order-event-title"
                className="text-white font-bold text-base"
              >
                {order.event?.title}
              </h3>
              <p className="text-gray-400 text-sm">
                📅 {order.event?.dateFormatted} — 📍 {order.event?.venue}
              </p>
            </div>
          </div>

          <button
            id={`expand-order-${order.id}`}
            data-cy="expand-order-btn"
            onClick={() => setExpanded(!expanded)}
            className="text-gray-400 hover:text-white transition-colors p-1"
            aria-label={expanded ? 'Fechar detalhes' : 'Ver detalhes'}
          >
            <svg
              className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-purple-900/20">
          <div className="flex gap-6">
            <div>
              <p className="text-gray-500 text-xs">Pedido</p>
              <p
                id={`order-id-display-${order.id}`}
                data-cy="order-id-display"
                className="text-purple-300 font-mono text-sm font-bold"
              >
                {order.id}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Ingressos</p>
              <p className="text-white text-sm font-bold">{totalTickets}x</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Pagamento</p>
              <p className="text-white text-sm capitalize">{
                order.paymentMethod === 'credit' ? '💳 Crédito'
                : order.paymentMethod === 'debit' ? '💳 Débito'
                : order.paymentMethod === 'pix' ? '⚡ PIX'
                : '📄 Boleto'
              }</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-500 text-xs">Total</p>
            <p
              id={`order-total-${order.id}`}
              data-cy="order-total"
              className="text-green-400 font-bold text-lg"
            >
              R$ {order.total?.toFixed(2).replace('.', ',')}
            </p>
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {expanded && (
        <div
          id={`order-details-${order.id}`}
          data-cy="order-details"
          className="border-t border-purple-900/30 p-5 bg-[#0f0f1a]/50 space-y-4"
        >
          {/* Ticket breakdown */}
          <div>
            <h4 className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-3">Ingressos</h4>
            <div className="space-y-2">
              {Object.entries(order.tickets || {})
                .filter(([, qty]) => qty > 0)
                .map(([key, qty]) => {
                  const [ticketId, type] = key.split('_');
                  return (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {qty}× {ticketId} ({type === 'meia' ? 'Meia-Entrada' : 'Inteira'})
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Addons */}
          {order.addons?.length > 0 && (
            <div>
              <h4 className="text-gray-300 text-xs font-bold uppercase tracking-wider mb-3">Adicionais</h4>
              <div className="space-y-1">
                {order.addons.map((id) => (
                  <p key={id} className="text-gray-300 text-sm">✨ {id}</p>
                ))}
              </div>
            </div>
          )}

          {/* QR Code mockup */}
          <div className="flex flex-col items-center py-4 bg-white rounded-2xl">
            <div className="w-32 h-32 bg-[#000] rounded-lg flex items-center justify-center text-6xl">
              📱
            </div>
            <p className="text-gray-600 text-xs mt-2 font-medium">QR Code do Ingresso</p>
            <p className="text-gray-400 text-xs">{order.transactionId}</p>
          </div>

          <p className="text-gray-500 text-xs text-center">
            Comprado em {new Date(order.createdAt).toLocaleString('pt-BR')}
          </p>
        </div>
      )}
    </div>
  );
}

export default function MyTickets() {
  const navigate = useNavigate();
  const orders = storage.getOrders();

  const handleClearAll = () => {
    if (confirm('Tem certeza que deseja remover todos os seus ingressos? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem('showtickets_orders');
      window.location.reload();
    }
  };

  return (
    <main id="my-tickets-page" data-cy="my-tickets-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1
            id="my-tickets-title"
            data-cy="my-tickets-title"
            className="text-white text-3xl font-black mb-1"
          >
            Meus Ingressos
          </h1>
          <p className="text-gray-400">
            {orders.length} compra{orders.length !== 1 ? 's' : ''} realizada{orders.length !== 1 ? 's' : ''}
          </p>
        </div>
        {orders.length > 0 && (
          <button
            id="clear-orders-btn"
            data-cy="clear-orders-btn"
            onClick={handleClearAll}
            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-red-900/10"
          >
            Limpar histórico
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div id="no-tickets" data-cy="no-tickets" className="text-center py-24">
          <div className="text-7xl mb-6">🎫</div>
          <h2 className="text-white text-2xl font-black mb-3">Nenhum ingresso ainda</h2>
          <p className="text-gray-400 mb-8">
            Você ainda não comprou nenhum ingresso. Que tal descobrir os próximos shows?
          </p>
          <button
            id="discover-events-btn"
            data-cy="discover-events-btn"
            onClick={() => navigate('/eventos')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all hover:scale-105 shadow-lg shadow-purple-900/40"
          >
            🎉 Descobrir Eventos
          </button>
        </div>
      ) : (
        <div id="orders-list" data-cy="orders-list" className="space-y-4">
          {orders.map((order) => (
            <TicketCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </main>
  );
}
