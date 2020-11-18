// 1. On Search, query the API with the given string
//     > API = http://api.tvmaze.com/search/shows?q=girls
// 2. get the results, and save the...
//     show -> image -> medium
//     show -> name

const tvListDiv = document.querySelector("#tv-list");

function searchForTvShows(show) {
  const tvThumbnail = document.createElement("IMG");
  tvThumbnail.src = "dfdf";
  tvThumbnail.alt = "name";
  tvThumbnail.classList.add("tv-thumbnail");
  tvListDiv.append(tvThumbnail);
}
