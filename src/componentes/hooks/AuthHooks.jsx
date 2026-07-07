import  { createContext, useContext } from 'react';
// 1. Crear el contexto
export const AuthContext = createContext();
// Hook personalizado
export const useAuth = () => {
    const context = useContext(AuthContext);
if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
}

return context;
};