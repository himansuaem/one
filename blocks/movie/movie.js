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

  const title = document.createElement("h1");
  title.textContent = movie.title;

  block.append(title);

  if (movie.backdrop_path) {
    const img = createOptimizedPicture(
      `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
      movie.title
    );

    block.append(img);
  }
}

