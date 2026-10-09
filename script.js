const form = document.querySelector("#movieForm");
const titleInput = document.querySelector("#title");
const directorInput = document.querySelector("#director");
const reviewInput = document.querySelector("#review");
const errorText = document.querySelector("#error");
const listBtn = document.querySelector("#listBtn");
const removeLastBtn = document.querySelector("#removeLastBtn");
const titlesBtn = document.querySelector("#titlesBtn");
const clearBtn = document.querySelector("#clearBtn");
const ratingInput = document.querySelector("#rating");


const saved = localStorage.getItem("movies");
const movies = JSON.parse(saved) || [];

function save() {
  const text = JSON.stringify(movies);
  localStorage.setItem("movies", text);
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = titleInput.value.trim();
  const director = directorInput.value.trim();
  const review = reviewInput.value.trim();
  const ratingText = ratingInput.value.trim();
  const rating = Number(ratingText);


  if (title === "") {
    errorText.textContent = "Please enter a title";
    return;
  }

  if (title.length < 2) {
    errorText.textContent = "Title must be atleast 2 characters long";
    return;
  }

  if (director === "") {
    errorText.textContent = "Please enter a Director";
    return;
  }

  if (director.length < 2) {
    errorText.textContent = "Director name must be atleast 2 characters long";
    return;
  }

  if (review === "") {
    errorText.textContent = "Please enter a review";
    return;
  }

  if (review.length < 10) {
    errorText.textContent = "Review must be atleast 10 characters long";
    return;
  }

  if(ratingText === "" || isNaN(rating))  {
    errorText.textContent = "Please enter a number";
  }

  if (rating < 1 || rating > 10) {
    errorText.textContent = "Rating must be between 1 and 10";
  }

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].title.toLowerCase() === title.toLowerCase()) {
      errorText.textContent = "This movie is already reviewed";

      return;
    }
  }

  errorText.textContent = "";

  const newMovie = {
    title: title,
    director: director,
    review: review,
    rating: rating,
  };

  movies.push(newMovie);
  save();

  titleInput.value = "";
  directorInput.value = "";
  reviewInput.value = "";
  ratingInput.value = "";
});

listBtn.addEventListener("click", function () {
  for (let i = 0; i < movies.length; i++) {
    const part = movies[i].director.split(" ");
    const lastName = part[part.length - 1];
    const label = movies[i].rating >= 7 ? "Good" : "Week";


    console.log(`${i+1}.${movies[i].title}(${lastName}) ${movies[i].rating}/10 - ${label}`, );
  }
});

removeLastBtn.addEventListener("click", function () {
  movies.pop();
  save();
  console.log("Removed last. Left: " + movies.length);
});

titlesBtn.addEventListener("click", function () {
  const titles = [];

  for (let i = 0; i < movies.length; i++) {
    titles.push(movies[i].title);
  }

  console.log(titles.join(", "));
});

clearBtn.addEventListener("click", function () {
  movies.splice(0, movies.length);
  localStorage.removeItem("movies");
  console.log("All movie data has been removed!");
});