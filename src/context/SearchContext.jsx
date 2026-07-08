import { useState } from "react";
import { createContext, useContext } from "react";

const SearchContext = createContext();
export function useSearch() {
    return useContext(SearchContext);
}
export function SearchProvider({ children }) {
    const [busqueda, setBusqueda] = useState("");
return (
    <SearchContext.Provider value={{ busqueda, setBusqueda }}>
    {children}
    </SearchContext.Provider>
);
}
