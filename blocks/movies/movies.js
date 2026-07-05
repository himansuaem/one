import { createOptimizedPicture } from '../../scripts/aem.js';
export default async function decorate (block) {
   await fetchData(block)
}

async function fetchData(block) {
 let api_url = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=0a5247d162a6d3455cfaff2ae266f450&original_language=hi&region=IN`)
 let movie_url = await api_url.json()
 let result_movie = movie_url.results
 for(let i = 0; i < result_movie.length; i++) {
  let movie_item = result_movie[i]
  let movie_id = movie_item.id 
  let movie_title = movie_item.title
  let movie_img = movie_item.backdrop_path
  let movie_name = document.createElement('p')
  let movie_thumbnail = document.createElement('img')
  movie_name.textContent = movie_title
  if (movie_img) {
    let full_movie_img = `https://image.tmdb.org/t/p/w500/${movie_img}`
  }
  movie_thumbnail.src = movie_img
  block.append(movie_name)
  block.append(movie_thumbnail)
 }  
}