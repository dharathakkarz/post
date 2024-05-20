import React, { createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const signUp = async (email, password, confirmPassword, firstName, lastName, mobileNumber) => {
    try {
   
      const user = {
        email,
        firstName,
        lastName,
        mobileNumber,
        password
      };

      console.log('Signed up:', user);
    } catch (error) {
      throw new Error('Sign up failed');
    }
  };

  return (
    <AuthContext.Provider value={{ signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
