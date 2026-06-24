import { useState } from 'react';

const FAQ = [
  {
    q: 'Como recebo meus ingressos?',
    a: 'Seus ingressos são enviados imediatamente para o e-mail cadastrado após a confirmação do pagamento. Você também pode acessá-los na seção "Meus Ingressos".',
  },
  {
    q: 'Posso cancelar minha compra?',
    a: 'Sim! De acordo com o Código de Defesa do Consumidor, você pode cancelar a compra em até 7 dias corridos após a aquisição, desde que o evento não tenha ocorrido. Entre em contato com nossa equipe.',
  },
  {
    q: 'Meia-entrada: quem tem direito?',
    a: 'Estudantes com carteirinha válida, professores da rede pública, idosos acima de 60 anos, pessoas com deficiência e jovens de baixa renda com CadÚnico. A comprovação é exigida na entrada do evento.',
  },
  {
    q: 'O pagamento é seguro?',
    a: 'Sim! Utilizamos criptografia SSL de 256 bits em todas as transações. Seus dados nunca são armazenados em nossos servidores — processamos tudo via gateway certificado PCI-DSS.',
  },
  {
    q: 'Posso transferir meu ingresso para outra pessoa?',
    a: 'Depende do evento. Alguns organizadores permitem a transferência mediante solicitação. Entre em contato conosco informando o número do pedido.',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Nome é obrigatório';
    if (!form.email.trim()) errs.email = 'E-mail é obrigatório';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'E-mail inválido';
    if (!form.subject.trim()) errs.subject = 'Assunto é obrigatório';
    if (!form.message.trim()) errs.message = 'Mensagem é obrigatória';
    else if (form.message.trim().length < 20) errs.message = 'Mensagem muito curta (mínimo 20 caracteres)';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <main id="contact-page" data-cy="contact-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1
          id="contact-page-title"
          data-cy="contact-page-title"
          className="text-white text-4xl font-black mb-3"
        >
          Fale com a Gente
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Estamos aqui para ajudar! Entre em contato por um dos canais abaixo ou nos envie uma mensagem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact channels */}
        <div className="space-y-4">
          {[
            {
              id: 'contact-whatsapp',
              icon: '💬',
              title: 'WhatsApp',
              desc: 'Atendimento rápido via chat',
              detail: '(11) 99999-0000',
              sub: 'Seg-Sex, 9h–18h',
              color: 'green',
            },
            {
              id: 'contact-email',
              icon: '📧',
              title: 'E-mail',
              desc: 'Respondemos em até 24h',
              detail: 'suporte@showtickets.com.br',
              sub: 'Qualquer horário',
              color: 'blue',
            },
            {
              id: 'contact-phone',
              icon: '📞',
              title: 'Telefone',
              desc: 'Central de atendimento',
              detail: '0800 720 1234',
              sub: 'Seg-Sex, 8h–20h | Sáb, 9h–15h',
              color: 'purple',
            },
          ].map((ch) => (
            <div
              key={ch.id}
              id={ch.id}
              data-cy="contact-channel"
              className={`bg-[#13131f] border border-${ch.color}-900/30 rounded-2xl p-5 hover:border-${ch.color}-700/40 transition-colors`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{ch.icon}</span>
                <div>
                  <h3 className="text-white font-bold">{ch.title}</h3>
                  <p className="text-gray-400 text-xs">{ch.desc}</p>
                </div>
              </div>
              <p className={`text-${ch.color}-300 font-semibold text-sm`}>{ch.detail}</p>
              <p className="text-gray-500 text-xs mt-0.5">{ch.sub}</p>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div
              id="contact-success"
              data-cy="contact-success"
              className="bg-[#13131f] border border-green-700/40 rounded-2xl p-10 text-center h-full flex flex-col items-center justify-center"
            >
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-green-400 text-2xl font-black mb-2">Mensagem Enviada!</h2>
              <p className="text-gray-300 mb-1">Obrigado por entrar em contato, {form.name}!</p>
              <p className="text-gray-400 text-sm mb-8">
                Nossa equipe responderá em breve para <strong className="text-white">{form.email}</strong>
              </p>
              <button
                id="send-another-btn"
                data-cy="send-another-btn"
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form
              id="contact-form"
              data-cy="contact-form"
              onSubmit={handleSubmit}
              className="bg-[#13131f] border border-purple-900/30 rounded-2xl p-6 md:p-8 space-y-4"
              noValidate
            >
              <h2 className="text-white text-xl font-bold mb-2">Envie uma Mensagem</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-gray-300 text-sm font-medium mb-2">
                    Nome Completo <span className="text-pink-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    data-cy="contact-name"
                    type="text"
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    className={`w-full bg-[#0f0f1a] border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500' : 'border-purple-900/40 focus:border-purple-500'
                    }`}
                  />
                  {errors.name && (
                    <p id="contact-error-name" data-cy="contact-error-name" className="text-red-400 text-xs mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-gray-300 text-sm font-medium mb-2">
                    E-mail <span className="text-pink-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    data-cy="contact-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className={`w-full bg-[#0f0f1a] border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-purple-900/40 focus:border-purple-500'
                    }`}
                  />
                  {errors.email && (
                    <p id="contact-error-email" data-cy="contact-error-email" className="text-red-400 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-gray-300 text-sm font-medium mb-2">
                  Assunto <span className="text-pink-500">*</span>
                </label>
                <select
                  id="contact-subject"
                  data-cy="contact-subject"
                  value={form.subject}
                  onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                  className={`w-full bg-[#0f0f1a] border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                    errors.subject ? 'border-red-500' : 'border-purple-900/40 focus:border-purple-500'
                  }`}
                >
                  <option value="">Selecione um assunto</option>
                  <option value="compra">Problema com compra</option>
                  <option value="reembolso">Solicitação de reembolso</option>
                  <option value="ingresso">Ingresso não recebido</option>
                  <option value="evento">Informações sobre evento</option>
                  <option value="parceria">Parceria comercial</option>
                  <option value="outro">Outro assunto</option>
                </select>
                {errors.subject && (
                  <p id="contact-error-subject" data-cy="contact-error-subject" className="text-red-400 text-xs mt-1">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-gray-300 text-sm font-medium mb-2">
                  Mensagem <span className="text-pink-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  data-cy="contact-message"
                  rows={5}
                  placeholder="Descreva sua dúvida ou problema com o máximo de detalhes possível..."
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className={`w-full bg-[#0f0f1a] border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-purple-900/40 focus:border-purple-500'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.message ? (
                    <p id="contact-error-message" data-cy="contact-error-message" className="text-red-400 text-xs">
                      {errors.message}
                    </p>
                  ) : <span />}
                  <span className="text-gray-500 text-xs">{form.message.length} caracteres</span>
                </div>
              </div>

              <button
                id="contact-submit-btn"
                data-cy="contact-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.02] disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  '📨 Enviar Mensagem'
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ */}
      <section id="faq-section" data-cy="faq-section">
        <h2 className="text-white text-3xl font-black mb-6 text-center">Perguntas Frequentes</h2>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ.map((item, i) => (
            <div
              key={i}
              id={`faq-item-${i}`}
              data-cy="faq-item"
              className="bg-[#13131f] border border-purple-900/30 rounded-2xl overflow-hidden"
            >
              <button
                id={`faq-toggle-${i}`}
                data-cy="faq-toggle"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="text-white font-semibold">{item.q}</span>
                <span className={`text-purple-400 text-xl transition-transform ${openFaq === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openFaq === i && (
                <div
                  id={`faq-answer-${i}`}
                  data-cy="faq-answer"
                  className="px-6 pb-5"
                >
                  <p className="text-gray-300 text-sm leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
