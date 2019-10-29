
$(document).ready(function () {
 
    // If search button is clicked, set city value to whatever was input
    $("#sBtn").on("click", function(event) {
        event.preventDefault();
        let userInput = $("#city-search").val().trim();
        sessionStorage.setItem("cityName", userInput);
        window.location = "./search.html";
    });

    // If no city has been entered in search, run this API call for whatever category page you're on
        
        let category = $(".events-col").attr("data-category");
        let eventfulApiKey = "sBvrpV2SwZr28tJg";
        let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${eventfulApiKey}&q=halloween&c=${category}&l=phoenix+arizona&within=30&units=miles&date=future`;

        $.ajax({
            url: queryUrl,
            method: "GET"
        })
            .then(function (response) {

                let results = JSON.parse(response);

                var eventsLocs = [];
                for (let i = 0; i < results.events.event.length; i++) {

                    eventsLocs.push(results.events.event[i].venue_address);

                    let eventDiv = $("<div>").attr("class", "event-div");
                    let eventTitle = $("<h3>").text(results.events.event[i].title);

                    eventDiv.append(eventTitle);
                    $(".events-col").append(eventDiv);
                };
                myMap(eventsLocs);
            });
});

