import { createOptimizedPicture } from '../../scripts/aem.js';
export default async function decorate (block) {
   await fetchData(block)
}

async function fetchData(block) {
 let api_url = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0a5247d162a6d3455cfaff2ae266f450&original_languag=hi&region=IN`)
 let movie_url = await api_url.json()
 let result_movie = movie_url.results
 for( i = 0; i < result_movie.length; i++) {
  let movie_item = result_movie[i]
  let movie_id = movie_item.id 
  let movie_title = movie_item.title
  let movie_name = document.createElement('p')
  movie_name.textContent = movie_title
  block.append(movie_name)
 }  
}