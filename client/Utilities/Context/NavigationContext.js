import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState("quiz_listing");

  const navigate = (screen) => {
    //returned from Main APP
    setCurrentScreen(screen);
  };

  return (
    <NavigationContext.Provider value={{ currentScreen, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);
