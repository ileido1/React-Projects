import './App.css'
import { Movies } from './components/movie.jsx'
import { useMoviesBySearch } from './hooks/useMovie'
import { useEffect, useState, useRef, useCallback} from 'react'
import debounce from 'just-debounce-it'

function useSearch() {
  
  const [search,updateSearch] = useState('')
  const [error,setError] = useState(null)
  
  const isFirtInput = useRef(true)
  useEffect(() => { 
      if (isFirtInput.current) {
        isFirtInput.current = search == ''
        return
      }
    if (search === ''){
      setError('Please enter a valid search')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('Please enter a valid search')
      return
    }
    setError(null)
  }, [search])
  return {search,updateSearch,error}
}

function App() {
const [sort,setSort] = useState(false)
const {search,updateSearch,error} = useSearch()
const {movies,loading, getMovies} = useMoviesBySearch(search, sort)
const debouncedGetMovies = useCallback(
  debounce(search => {
    console.log('search', search)
    getMovies({ search })
  }, 800)
  , [getMovies]
)

const handleSort = () => { 
setSort(!sort)
  }


const handleSubmit = (event) => {
  event.preventDefault();
  getMovies({search})
}
const handleChange = (event) => {
  const newSearch = event.target.value
  updateSearch(newSearch)
  debouncedGetMovies(newSearch)
}



  return (
    <>
    <header>
    <h1>Search movies</h1>
    <form className='form' onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" value={search} placeholder="Search movies" name='query' />
      <input type='checkbox' onChange={handleSort} checked={sort}></input>
      <input type="submit"  value="Search" name='search' />
    </form>
    { error && <p className='error'>{error}</p>}
    </header>
    <main>{ loading ? <p>Loading...</p> : <Movies movies={movies} />}
    </main>
    </>
  )
}

export default App
