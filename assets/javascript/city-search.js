$(document).ready(function () {
  // When button is clicked, save user input and send to the ajax search
  $("#sBtn").on("click", function (event) {
    event.preventDefault();
    let userInput = $("#city-search").val().trim();
    sessionStorage.setItem("cityName", userInput);
    let city = sessionStorage.getItem("cityName");
    $("#city-name").text(city);

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
        console.log(response);
      // Create temporary div to add new event divs to
      let fragment = document.createDocumentFragment();
      // Clear the previous city results
      let resultsDiv = document.querySelector(".results-div");
      resultsDiv.innerHTML = "";

      for (let i = 0; i < 8; i++) {
        // For 8 loops, create a div with the title of an event and add to fragment
        let eventDiv = document.createElement("div");
        eventDiv.className = "event-div";
        eventDiv.textContent = `${response.results[i].title}`;

        let link = document.createElement("a");
        link.href = `${response.results[i].link}`;
        link.target = "_blank";
        link.append(eventDiv);
        fragment.append(link);
      }

      // Add all the event divs to the display div
      resultsDiv.append(fragment);
    });
  });
});
