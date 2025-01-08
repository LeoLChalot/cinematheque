import { useState, useContext, createContext } from "react";

const ApiContext = createContext();

export function ApiProvider({ children }) {
    const url = import.meta.env.VITE_API_URL;
    const token = import.meta.env.VITE_API_KEY;

    return (
        <ApiContext.Provider value={{ url, token }}>
            {children}
        </ApiContext.Provider>
    );
}


export const useApi = () => useContext(ApiContext);