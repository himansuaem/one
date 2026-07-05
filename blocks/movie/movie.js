import { createOptimizedPicture } from '../../scripts/aem.js';
export default async function decorate (block) {
  block.textContent = ''; // remove leftover authored row/cell divs
   const params = new URLSearchParams(window.location.search)
   const id = params.get("id") 
   if(!id) {
    block.textContent = "Movie not found"
    return
   }
   await fetchData(id, block)
}

async function fetchData(id, block) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=0a5247d162a6d3455cfaff2ae266f450`
  );

  const movie = await response.json();

  const card = document.createElement("div");
  card.className = "movie-card";

  const title = document.createElement("h1");
  const description = document.createElement('p')
  title.textContent = movie.title;
  let page_title = document.title 
  description.textContent = movie.overview

  card.append(title);
  card.append(page_title)

  if (movie.backdrop_path) {
    const img = createOptimizedPicture(
      `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      movie.title
    );
    card.append(img);
    card.append(description)
  }

  block.append(card);
}

