const KEYS = {
  ORDERS: 'showtickets_orders',
  CART: 'showtickets_cart',
};

export const storage = {
  getOrders: (userId = null) => {
    try {
      const all = JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
      if (userId) return all.filter((o) => o.userId === userId);
      return all;
    } catch {
      return [];
    }
  },

  saveOrder: (order) => {
    const orders = JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
    const newOrder = {
      ...order,
      id: `ST-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(orders));
    return newOrder;
  },

  getCart: () => {
    try {
      return JSON.parse(localStorage.getItem(KEYS.CART) || 'null');
    } catch {
      return null;
    }
  },

  saveCart: (cart) => localStorage.setItem(KEYS.CART, JSON.stringify(cart)),
  clearCart: () => localStorage.removeItem(KEYS.CART),
};
