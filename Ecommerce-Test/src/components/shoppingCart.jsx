import { CartContext } from '../context/cart'
import { ClearCartIcon, CartIcon } from './icons'
import './shoppingcart.css'
import { useContext, useId } from 'react'
import { CartItem } from './cartItem'

export function Cart() {
    const cartCheckboxId = useId()
    const { cart, clearCart,addToCart } = useContext(CartContext)
    return (
        <>
            <label htmlFor={cartCheckboxId} className='cart-button'>
                <CartIcon />
            </label>
            <input type="checkbox" hidden id={cartCheckboxId} />
            <aside className='cart'>
                <ul>{
                    cart.map((product) => (
                       <CartItem key={product.id} {...product} addToCart={()=>addToCart(product)}></CartItem>
                    ))
                }
                </ul>
                <button  onClick={()=>clearCart()}><ClearCartIcon></ClearCartIcon></button>
            </aside>
        </>
    )
}