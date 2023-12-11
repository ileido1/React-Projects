import {useCatImage} from './hooks/useCatImage'

export function App(){
    const {imageUrl, cat, refreshCat} = useCatImage();
    const handleNewCat = () => {
        refreshCat()
    }
    return(
        <>
        <main>
        <h1>Test</h1>
        <button onClick={handleNewCat }>New cat</button>
        {cat.fact && <>
        <p>{cat.fact} </p>
        <img src={imageUrl} alt="Image of first word of facto" />
        </>}
        </main>
        </>
    )
}