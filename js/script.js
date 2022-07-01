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
          ).innerHTML = `<h3>No Results</h3>`;
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

// Agent Widget SDK

lpTag.agentSDK.init();
document.querySelector(".version").innerHTML = `<div>V 1.4</div>`;

// var pathToData = "chatTranscript.lines";

// const onSuccess = (msg) => console.log("Chat Transcript Success", msg);

// const onError = (err) => console.log("Chat Transcript Error", err);

// lpTag.agentSDK.get(pathToData, onSuccess, onError);

var onSuccess = function (data) {
  document.querySelector(".success-msg").innerHTML = `<h4>Data : ${
    data[data.length - 1].text
  }</h4>`;
};

var onError = function (err) {
  document.querySelector(".error-msg").innerHTML = `<h4>Error</h4>`;
};

var pathToData = "chatTranscript.lines";

lpTag.agentSDK.get(pathToData, onSuccess, onError);
