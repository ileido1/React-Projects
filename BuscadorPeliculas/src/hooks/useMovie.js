import { useRef, useState,useMemo,useCallback } from 'react'
import { searchMovies } from '../services/movies'
export function useMoviesBySearch(search, sort) {
    const [movies, setMovies] = useState([])
    const[loading, setLoading] = useState(false)
    const[error, setError] = useState(null)
    const previousSearch = useRef(search)

    const getMovies = useCallback(async ({search}) => {
        if(previousSearch.current === search) return
        try{
          setLoading(true)
          setError(null)
        searchMovies({search}).then((movies) => {
          setMovies(movies)
          setLoading(false)
        })
      }catch(error){
        setError(error)}
        finally{
          setError(error)
          setLoading(false)
        }
      }
    ,[])
    const sortMovies = useMemo(()=>{
      return sort ? [...movies]
      .sort((a,b) => a.title.localeCompare(b.title)) : movies
    },[sort, movies]) 
    
    return{movies:sortMovies,loading, getMovies}
  
  }

  