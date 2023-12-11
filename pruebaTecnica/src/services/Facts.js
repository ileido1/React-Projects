const CAT_API = 'https://catfact.ninja/fact'
export const getRamdomCat = () => {
  return fetch(CAT_API)
        .then(response => response.json())
        .then(data => {
            const firstWord = data.fact.split(' ')[0]
            return ({data, firstWord})
        })
}