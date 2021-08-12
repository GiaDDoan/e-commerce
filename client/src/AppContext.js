import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext(null);

const AppProvider = ({ children }) => {
  const [cartToggle, setCartTottle] = useState(false);

  return (
    <AppContext.Provider
      value={{
        cartToggle,
        setCartTottle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
