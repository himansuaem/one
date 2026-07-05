import { createOptimizedPicture } from '../../scripts/aem.js';
export default async function decorate (block) {
  block.textContent = ''; // remove leftover authored row/cell divs
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
  const card = document.createElement('div')
  card.className = "movie-card"
  if (movie_img) {
    let full_movie_img = `https://image.tmdb.org/t/p/w500${movie_img}`
    movie_thumbnail.src = full_movie_img
    let optimized_img = createOptimizedPicture(full_movie_img, movie_title)
    card.append(optimized_img)
  }
   /* Create a route for each movie */
  function createSlug(title) {
    return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
  }
  let slug = createSlug(movie_title)
  const link = document.createElement('a')
  link.href = `/movie/${slug}`
  link.append(card)
  card.append(movie_name)
  block.append(link)
 }  
}