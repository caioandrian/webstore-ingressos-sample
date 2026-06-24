const KEYS = {
  ORDERS: 'showtickets_orders',
  CART: 'showtickets_cart',
  USER: 'showtickets_user',
};

export const storage = {
  getOrders: () => {
    try {
      return JSON.parse(localStorage.getItem(KEYS.ORDERS) || '[]');
    } catch {
      return [];
    }
  },

  saveOrder: (order) => {
    const orders = storage.getOrders();
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

  saveCart: (cart) => {
    localStorage.setItem(KEYS.CART, JSON.stringify(cart));
  },

  clearCart: () => {
    localStorage.removeItem(KEYS.CART);
  },

  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem(KEYS.USER) || 'null');
    } catch {
      return null;
    }
  },

  saveUser: (user) => {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  },
};
