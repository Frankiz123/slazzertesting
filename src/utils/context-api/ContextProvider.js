import React, {useState, useEffect, useContext} from 'react';
import {ApplicationContext} from './Context';

export const ContextProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [userBrandData, setUserBrandData] = useState([]);
  return (
    <ApplicationContext.Provider
      value={{
        token,
        setToken,
        userBrandData,
        setUserBrandData,
      }}>
      {children}
    </ApplicationContext.Provider>
  );
};
