import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (credentials) => {
    // Simulate login logic
    setIsAuthenticated(true);
    setUser({ name: 'Super Admin' }); // Replace with actual user data
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <LoginContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
