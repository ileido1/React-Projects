import { createContext, useReducer } from "react";
import {reducer, initialState} from '../reducers/cart'
//Creo el contexto para los filtros
export const CartContext = createContext();


// Crear el provider
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const addToCart = (product) => dispatch({
        type: 'ADD_TO_CART', payload: product
    })
    const RemoveFromCart = (product) => dispatch({
        type: 'removeFromCart', payload: product
    })
    const clearCart = () => dispatch({ type: 'clearCart' })

    return (
        <CartContext.Provider value={
            { cart:state, addToCart, clearCart, RemoveFromCart }
        }>
            {children}
        </CartContext.Provider>
    );
}