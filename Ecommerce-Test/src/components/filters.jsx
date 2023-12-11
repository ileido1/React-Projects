import './filters.css'
import {  useId } from 'react'
import { useFilters } from '../hooks/useFilters'
export function Filters (){
    const {setFilters, filters} = useFilters()
    const minPriceFilteredId = useId()
    const categoryFilteredId = useId()

    const handleChange = (e) => {
        (e.target.value)
        setFilters((prevState) => ({
            ...prevState,  minPrice: e.target.value
        }))
    }

    const handleCategoryChange = (e) => {
        setFilters((prevState) => ({
            ...prevState,  category: e.target.value
        }))
    }
    return(
    <>
    <form className="filters">
        <div className="">
        <label htmlFor='category'>Category</label>
        <select name='category' id={categoryFilteredId} onChange={handleCategoryChange}>
            <option value='all'>All</option>
            <option value='home-decoration'>home-decoration</option>
            <option value='clothes'>Clothes</option>
            <option value='home'>Home</option>
        </select>
        </div>
        <div className="priceContainer">
        <label htmlFor='minPrice'>Min Price</label>
        <input
         onChange={handleChange} 
         type='range' 
         name='minPrice' 
         id={minPriceFilteredId} 
         min='0'
        max='1000' />
        <span>${filters.minPrice}</span>
        </div>
    </form>
    </>
    )
}