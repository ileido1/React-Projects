import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => { 

const context = useContext(CartContext)
if(context === undefined){
  throw new Error('useCart debe estar dentro del proveedor CartContext')
}


return context


}