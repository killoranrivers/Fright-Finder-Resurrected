// Create loading message to show while ajax is getting results
let loadingMsg = document.getElementById("loading-msg");
let loadingIcon = document.createElement("i");
loadingIcon.classList.add("fas", "fa-spider", "fa-spin", "mr-2");
let loadingText = document.createElement("span");
loadingText.id = "loading-text";
loadingText.textContent = "Loading...";

// Declaring function to run city search
function citySearch(city) {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://google-search3.p.rapidapi.com/api/v1/search/q=halloween+events+${city}`,
    method: "GET",
    headers: {
      "x-user-agent": "desktop",
      "x-proxy-location": "US",
      "x-rapidapi-host": "google-search3.p.rapidapi.com",
      "x-rapidapi-key": "54e3c4abe4msh829dbb8d905b2eap1003b4jsn05bcefeb067b",
    },
  };

  $.ajax(settings).done(function (response) {
    // Create temporary div to add new event divs to
    let fragment = document.createDocumentFragment();
    // Clear the previous city results
    const resultsDiv = document.querySelector(".results-div");
    resultsDiv.innerHTML = "";

    for (let i = 0; i < 8; i++) {
      // For 8 loops, create a div with the title of an event and add to fragment
      const eventDiv = document.createElement("div");
      eventDiv.className = "event-div";
      eventDiv.textContent = `${response.results[i].title}`;
      // Also create anchor tags so results are clickable
      const link = document.createElement("a");
      link.href = `${response.results[i].link}`;
      link.target = "_blank";
      link.append(eventDiv);
      fragment.append(link);
    }

    // Add all the event divs to the display div
    resultsDiv.append(fragment);
  });
}

$(document).ready(function () {
  // When search button is clicked, save user input and send to the ajax search
  $("#sBtn").on("click", function(event) {
    event.preventDefault();
    let userInput = $("#city-search").val().trim();
    sessionStorage.setItem("cityName", userInput);
    sessionStorage.setItem("redirect", false);
    let city = sessionStorage.getItem("cityName");
    $("#city-name").text(city);
    citySearch(city);
  });

  // If user came from category page, run this code when the page loads
  if (sessionStorage.getItem("redirect")) {
    let city = sessionStorage.getItem("cityName");
    $("#city-name").text(city);
    citySearch(city);
  }
});
