const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elSelect = document.querySelector(".genres__select");
const elForm = document.querySelector(".form");

elResult.textContent = movies.length;


const renderGenres = function (arr) {
  const uniqueGenres = [];


  arr.forEach((film) => {
    film.categories.forEach((genre) => {
      if (!uniqueGenres.includes(genre)) {
        uniqueGenres.push(genre);
      }
    });
  });

  uniqueGenres.forEach((genre) => {
    const genresOption = document.createElement("option");

    genresOption.textContent = genre;
    genresOption.value = genre;

    elSelect.appendChild(genresOption);
  });
};

const renderMovies = function (movies, htmlElement) {
  movies.forEach((movie) => {
    //CREATE ELEMENT
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newLanguage = document.createElement("p");
    const newYear = document.createElement("p");
    const newButton = document.createElement("a");

    //SET ATTTIBUTE
    newLi.setAttribute("class", "card mb-3");
    newLi.style.width = "18rem";
    newImg.classList.add("card-img-top");
    newImg.setAttribute("src", movie.smallThumbnail);
    newDiv.classList.add("card-body");
    newTitle.classList.add("card-title");
    newLanguage.classList.add("card-text");
    newYear.classList.add("card-text");
    newButton.setAttribute("class", "btn trailer position-relative");
    newButton.setAttribute(
      "href",
      `https://www.youtube.com/watch?v=${movie.youtubeId}`
    );

    newTitle.textContent = movie.title;
    newLanguage.textContent = movie.language;
    newYear.textContent = movie.year;
    newButton.textContent = "Watch Trailer";

    const genresList = document.createElement("ul");

    movie.categories.forEach((genre) => {
      const genreItem = document.createElement("li");

      genreItem.textContent = genre;

      genresList.appendChild(genreItem);
    });

    //APPEND
    htmlElement.appendChild(newLi);
    newLi.appendChild(newImg);
    newLi.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newLanguage);
    newDiv.appendChild(newYear);
    newDiv.appendChild(newButton);
    newDiv.appendChild(genresList);
  });
};

renderGenres(movies);
renderMovies(movies, elMovieList)


elForm.addEventListener("submit", function(e){
  e.preventDefault();

  // let selectedFilms = [];
    
  elMovieList.innerHTML = null;


  let selectedGenre = elSelect.value;

  let filterFilms = movies.filter(function(movie){
    if(selectedGenre === "all" || movie.categories.includes(selectedGenre)){
      return movie
    }
    
  })
  elResult.textContent = filterFilms.length;
  renderMovies(filterFilms, elMovieList)
})