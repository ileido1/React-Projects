
import './App.css'
import {products as allproductos} from './mocks/products.json'
import { Products } from './components/products'
import {  useState } from 'react'
import { Header } from './components/header'
import { Footer } from './components/footer'
import { useFilters } from './hooks/useFilters'
import { Cart } from './components/shoppingcart'
import { CartProvider } from './context/cart'

function App() {
const [products] = useState(allproductos)
const { filterProducts} = useFilters()
const filteredProducts = filterProducts(products)
return (
    <>
    <CartProvider>
    <Header ></Header>
    <Cart></Cart>
    <Products products={filteredProducts} />
    <Footer/>
    </CartProvider>
    </>
  )
}

export default App
