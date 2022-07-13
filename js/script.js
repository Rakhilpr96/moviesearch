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

document.querySelector(".version").innerHTML = `<div>V 2.6</div>`;

// Agent Widget SDK

lpTag.agentSDK.init();

var onSuccess = function (data) {
  const lastMsg = data[data.length - 1].text;
  document.querySelector("input").value = `${lastMsg}`;
  if (lastMsg.includes("?")) {
    document.querySelector(
      ".new-msg"
    ).innerHTML = `User question :<h6>${lastMsg}</>`;
    var cmdName = lpTag.agentSDK.cmdNames.notify;
    var notifyData = {};

    var notifyWhenDone = function (err) {
      if (err) {
        document.querySelector(
          ".error-msg"
        ).innerHTML = `Error : <h6>${err}</h6>`;
      } else {
        document.querySelector(
          ".notify-msg"
        ).innerHTML = `<h6>Notification Sent Successfully</h6>`;
      }
    };

    lpTag.agentSDK.command(cmdName, notifyData, notifyWhenDone);

    var cmdName2 = lpTag.agentSDK.cmdNames.writeSC; // = "Write StructuredContent"
    var data2 = {
      json: {
        type: "text",
        text: "product name",
        tooltip: "text tooltip",
        style: {
          bold: true,
          size: "large",
        },
      },
    };

    lpTag.agentSDK.command(cmdName2, data2, notifyWhenDone);
  }
  fetchMovies();
};

var onError = function (err) {
  document.querySelector(".error-msg").innerHTML = `Error : <h6>${err}</h6>`;
};

var notificationHandler = function (data) {
  document.querySelector(
    ".notify-msg2"
  ).innerHTML = `<h6>Notification triggered</h6>`;
};

// Add a notification handler.
lpTag.agentSDK.onNotify(notificationHandler);

var pathToData = "chatTranscript.lines";

lpTag.agentSDK.get(pathToData, onSuccess, onError);
