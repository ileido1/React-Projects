import { useState, useEffect } from "react"
import { getRamdomCat } from "../services/Facts"
export function useCatImage(){
    const CAT_URL = 'https://cataas.com/cat/says/'
    const [imageUrl, setImageUrl] = useState('')
    const [cat, setCats] = useState({fact: ''})
    const refreshCat = () => {
        getRamdomCat()
        .then(res => {
            setCats({fact: res.data.fact})
            setImageUrl(`${CAT_URL}${res.firstWord}`)
        })
    }
    useEffect(refreshCat,[])     

    return {imageUrl, cat, refreshCat}
}