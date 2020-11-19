const tvListDiv = document.querySelector("#tv-list");
const searchButton = document.querySelector("button");
const queryInput = document.querySelector("input");

async function searchForTvShows() {
  const queryString = queryInput.value;
  if (queryString == "") {
    return;
  }
  const url = `http://api.tvmaze.com/search/shows?q=${queryString}`;
  try {
    const rawData = await fetch(url);
    const jsonData = await rawData.json();
    clearTvList(tvListDiv);
    const shows = jsonData.map((entry) => entry.show);
    displayShows(shows);
    queryInput.value = "";
  } catch (e) {
    alert("No tv shows found with that name.", e);
  }

  function clearTvList(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  // Display a given array of shows
  function displayShows(shows) {
    for (show of shows) {
      const name = show.name;
      const images = show.image;
      let thumbnail = images === null ? null : images.medium;
      createThumbnail(name, thumbnail);
      console.log(`${name} for ${thumbnail}`);
    }
  }

  // Create a thumbnail and add it to the tv list section
  function createThumbnail(name, image) {
    const tvThumbnail = document.createElement("IMG");
    const defaultImage =
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.uh.edu%2Fpharmacy%2F_images%2Fstudents%2Fpcol-pceu%2Fno-image-available-2.jpg&f=1&nofb=1";
    tvThumbnail.src = image === null ? defaultImage : image;
    tvThumbnail.alt = name;
    tvThumbnail.classList.add("tv-thumbnail");
    tvListDiv.append(tvThumbnail);
  }
}

searchButton.addEventListener("click", searchForTvShows);
queryInput.addEventListener("keydown", (key) => {
  console.log(key.code);
  if (key.code === "Enter") {
    searchForTvShows();
  }
});
