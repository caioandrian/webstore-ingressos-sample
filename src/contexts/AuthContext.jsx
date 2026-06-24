import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'showtickets_users';
const SESSION_KEY = 'showtickets_session';

const getUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { success: false, error: 'E-mail ou senha incorretos.' };
    const { password: _p, ...safe } = found;
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
    setUser(safe);
    return { success: true };
  };

  const register = ({ name, email, cpf, phone, birthdate, password }) => {
    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Este e-mail já está cadastrado.' };
    }
    const newUser = {
      id: `USR-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      name,
      email,
      cpf,
      phone,
      birthdate,
      password,
      avatar: null,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const { password: _p, ...safe } = newUser;
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
    setUser(safe);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const updateProfile = (data) => {
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx === -1) return { success: false, error: 'Usuário não encontrado.' };

    if (data.email && data.email !== users[idx].email) {
      const conflict = users.find(
        (u, i) => i !== idx && u.email.toLowerCase() === data.email.toLowerCase()
      );
      if (conflict) return { success: false, error: 'Este e-mail já está em uso.' };
    }

    users[idx] = { ...users[idx], ...data };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const { password: _p, ...safe } = users[idx];
    localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
    setUser(safe);
    return { success: true };
  };

  const changePassword = (currentPassword, newPassword) => {
    const users = getUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx === -1) return { success: false, error: 'Usuário não encontrado.' };
    if (users[idx].password !== currentPassword)
      return { success: false, error: 'Senha atual incorreta.' };
    users[idx].password = newPassword;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
