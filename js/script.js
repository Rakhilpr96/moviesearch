function fetchMovies() {
  const val = document.querySelector("input").value;
  let movieList = [];

  fetch("https://www.omdbapi.com/?s=" + val + "&apikey=c15f80cd")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
    })
    .then((data) => {
      console.log(data.Search);
      movieList = data.Search;
      if (data) {
        if (data.Search?.length > 0) {
          document.getElementById("movie-list").innerHTML = data.Search.map(
            (item) =>
              `<li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">${item.Title}</div>
              Year : <span class="movie-year">${item.Year}</span>
            </div>
            <span class="badge bg-primary rounded-pill">${item.imdbID}</span>
          </li>`
          ).join("");
        } else {
          document.getElementById(
            "movie-list"
          ).innerHTML = `<h3 class="c-white">No Results</h3>`;
        }
      }
    })
    .catch((error) => {
      alert(error);
      console.error("FETCH ERROR:", error);
    });
}

document.getElementById("button-addon2").addEventListener("click", () => {
  fetchMovies();
});

document.querySelector(".version").innerHTML = `<div>V 2.0</div>`;

// Agent Widget SDK

var notificationHandler = function (data) {
  const msg = data[data.length - 1].text;
  document.querySelector(
    ".error-msg"
  ).innerHTML = `Notification : <h6>notification</h6>`;
};

var focusHandler = function () {
  // Do something when the visitor is focused
  document.querySelector(
    ".error-msg"
  ).innerHTML = `<h6>visitor is focused</h6>`;
};

var blurHandler = function () {
  // Do something when the visitor is blurred
  document.querySelector(".error-msg").innerHTML = `<h6>visitor is blured</h6>`;
};

lpTag.agentSDK.init({
  notificationCallback: notificationHandler,
  visitorFocusedCallback: focusHandler,
  visitorBlurredCallback: blurHandler,
});

var onSuccess = function (data) {
  const lastMsg = data[data.length - 1].text;
  document.querySelector("input").value = `${lastMsg}`;
  fetchMovies();
};

var onError = function (err) {
  document.querySelector(".error-msg").innerHTML = `Error : <h6>${err}</h6>`;
};

var pathToData = "chatTranscript.lines";

lpTag.agentSDK.get(pathToData, onSuccess, onError);
