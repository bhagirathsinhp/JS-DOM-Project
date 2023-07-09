const addMovieModal = document.getElementById("add-modal");
// const addMovieModal = document.querySelector("#add-modal");
// const addMovieModal = document.body.children[1];

const startAddMovieButton = document.querySelector("header button");
// const startAddMovieButton = document.querySelector("header").lastElementChild;

const backDrop = document.getElementById("backdrop");
// const backDrop = document.body.firstElementChild;

// const addMovieButton = addMovieModal.querySelector(".btn--success");
const cancelMovieButton = addMovieModal.querySelector(".btn--passive");
const addMovieButton = cancelMovieButton.nextElementSibling;

// const userInputs = addMovieModal.getElementsByTagName("input");
const userInputs = addMovieModal.querySelectorAll("input");

const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackdrop = () => {
  backDrop.classList.toggle("visible");
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const entryTextSection = document.getElementById("entry-text");

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const clickBackdropHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
  clearMovieInputs();
};

const cancelMovieButtonHandler = () => {
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
};

const clearMovieInputs = () => {
  // userInputs[0].value = "";
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const addMovieHandler = () => {
  const titleInput = userInputs[0].value;
  const imageUrlInput = userInputs[1].value;
  const ratingInput = userInputs[2].value;

  if (
    titleInput.trim() === "" ||
    imageUrlInput.trim() === "" ||
    ratingInput.trim() === "" ||
    +ratingInput < 1 ||
    +ratingInput > 5
  ) {
    alert("Invalid User Input - Also Ratings must be from 1 to 5");
    return;
  }

  const newMovies = {
    id: Math.random().toString(),
    title: titleInput,
    image: imageUrlInput,
    rating: ratingInput,
  };

  movies.push(newMovies);
  console.log(movies);

  closeMovieModal();
  clearMovieInputs();
  toggleBackdrop();

  renderNewMovieElement(
    newMovies.id,
    newMovies.title,
    newMovies.image,
    newMovies.rating
  );

  updateUI();
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>

    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5 Stars</p>
    </div>
  `;

  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listBase = document.getElementById("movie-list");
  listBase.append(newMovieElement);
};

const cancelMovieDeletion = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);

  const listBase = document.getElementById("movie-list");
  listBase.children[movieIndex].remove();
  // listBase.removeChild(listBase.children[movieIndex]);
  cancelMovieDeletion();
  updateUI();
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  cancelDeletionButton.removeEventListener("click", cancelMovieDeletion);

  cancelDeletionButton.addEventListener(
    "click",
    // () => {cancelMovieDeletion();}
    // We can use point to tie this function...
    cancelMovieDeletion
  );
  confirmDeletionButton.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
};

startAddMovieButton.addEventListener("click", showMovieModal);
backDrop.addEventListener("click", clickBackdropHandler);
addMovieButton.addEventListener("click", addMovieHandler);
cancelMovieButton.addEventListener("click", cancelMovieButtonHandler);
