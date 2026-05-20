

import React, { createContext, useContext, useState, useMemo } from 'react';


// 1. contectos individuales

const ConfigContext = createContext();
const AuthContext = createContext();
const CartContext = createContext();

// 2. diccionario de cambio de idioma
const translations = {
  es: {
    welcome: 'Bienvenido',
    logout: 'Cerrar Sesión',
    login: 'Iniciar Sesión',
    emptyCart: 'Tu carrito está vacío',
  },
  en: {
    welcome: 'Welcome',
    logout: 'Logout',
    login: 'Login',
    emptyCart: 'Your cart is empty',
  }
};


// 3. PROVIDERS


// Provider de Configuración (Tema e Idioma) 
export function ConfigProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('es');

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  
  // t contiene las traducciones del idioma actual
  const t = useMemo(() => translations[lang], [lang]);

  return (
    <ConfigContext.Provider value={{ theme, toggleTheme, lang, setLang, t }}>
      {children}
    </ConfigContext.Provider>
  );
}

// Provider de Autenticación (Usuario) 
export function AuthProvider({ children }) {
  // tener un usuario ya logueado
  const [user, setUser] = useState({ name: 'Leandro' }); 

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//  Provider del Carrito de Compras 
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Funciones del carrito lo basico
  const addToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  // Cálculo del total de items acumulados
  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}


// 4. HOOKS PERSONALIZADOS (Asegúrate de exportarlos todos)


export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig debe ser usado dentro de un ConfigProvider');
  }
  return context;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}