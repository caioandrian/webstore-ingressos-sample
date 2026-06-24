// Simulates payment processing with configurable success/failure rate
export const processPayment = (paymentData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // CPF ending in 00 always fails (for testing failure flow)
      const cpf = paymentData.cpf?.replace(/\D/g, '') || '';
      const forceFail = cpf.endsWith('00');

      // Card number starting with 5 always fails (simulate declined)
      const cardNum = paymentData.cardNumber?.replace(/\D/g, '') || '';
      const cardDeclined = cardNum.startsWith('5555');

      if (forceFail || cardDeclined) {
        resolve({
          success: false,
          error: cardDeclined
            ? 'Cartão recusado pela operadora. Verifique os dados ou use outro cartão.'
            : 'Pagamento recusado. CPF com restrição no sistema.',
          code: 'PAYMENT_DECLINED',
        });
        return;
      }

      resolve({
        success: true,
        transactionId: `TXN-${Date.now()}-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
        message: 'Pagamento aprovado com sucesso!',
      });
    }, 2200);
  });
};

export const formatCPF = (value) => {
  const nums = value.replace(/\D/g, '').slice(0, 11);
  return nums
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const formatCard = (value) => {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
};

export const formatExpiry = (value) => {
  const nums = value.replace(/\D/g, '').slice(0, 4);
  if (nums.length >= 3) return `${nums.slice(0, 2)}/${nums.slice(2)}`;
  return nums;
};

export const formatPhone = (value) => {
  const nums = value.replace(/\D/g, '').slice(0, 11);
  if (nums.length <= 10) {
    return nums.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
  }
  return nums.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
};

export const generatePixCode = () => {
  return `00020126580014BR.GOV.BCB.PIX0136${crypto.randomUUID()}5204000053039865802BR5913ShowTickets6009SAO PAULO62070503***6304${Math.floor(Math.random() * 9999).toString().padStart(4, '0')}`;
};
