import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const host = window.location.host;

    return (
        <AppContext.Provider value={{ host }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => React.useContext(AppContext);