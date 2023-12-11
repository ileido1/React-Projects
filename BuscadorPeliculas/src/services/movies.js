const API_KEY = '4a87ab3c';
export const searchMovies = async ({search}) => {
    if(search== '') return null
    if(search){
      return fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`).then((response) => {
        return response.json()
      }).then((data) => {
        return data.Search?.map((movie) =>(
            { id: movie.imdbID,
             title: movie.Title,
             year: movie.Year,
             poster: movie.Poster}))
      })
    }
}