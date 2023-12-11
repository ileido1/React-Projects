import { createContext, useState } from "react";
//Creo el contexto para los filtros
export const FiltersContext = createContext();

// Crear el provider
export function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
  category: 'all',
  minPrice: 40,
})
  return (
    <FiltersContext.Provider value={{filters,setFilters}}>
      {children}
    </FiltersContext.Provider>
  );
}