import { useCart } from '../hooks/useCart'
import {AddToCartIcon, RemoveFromCartIcon} from './icons'
import './products.css'

export function Products ({products}) {
const {addToCart, cart,RemoveFromCart} = useCart()
const checkProduct = (product) => {
    return cart.some((p) => p.id === product.id)
}
return (<>
<main className='products'>
 <ul>
    {products.slice(0,10).map((product) => {
        const isProductInCart = checkProduct(product)
        return (
    <li key={product.id}>
        <img src={product.thumbnail} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button style={{backgroundColor: isProductInCart ? '#fff' : ''}} onClick={()=> isProductInCart? RemoveFromCart(product): addToCart(product)}>
            {
                isProductInCart ? <RemoveFromCartIcon></RemoveFromCartIcon> :  <AddToCartIcon/>
            }
           </button>
    </li>
    )})}
 </ul>

</main>
 {<pre>{JSON.stringify(cart,null,2)}</pre>}
 </>
)
}