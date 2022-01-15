$(document).ready(function() {

    $("#sBtn").on("click", function(event) {
        event.preventDefault();
        let userInput = $("#city-search").val().trim();
        sessionStorage.setItem("cityName", userInput);
    });

    let city = sessionStorage.getItem("cityName");
    console.log(city);

    $("#city-name").text(city);

    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://google-search3.p.rapidapi.com/api/v1/search/q=halloween+events+${city}`,
        "method": "GET",
        "headers": {
            "x-user-agent": "desktop",
            "x-proxy-location": "US",
            "x-rapidapi-host": "google-search3.p.rapidapi.com",
            "x-rapidapi-key": "54e3c4abe4msh829dbb8d905b2eap1003b4jsn05bcefeb067b"
        }
    };
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });

    // let eventfulApiKey = "sBvrpV2SwZr28tJg";
    // let queryUrl = `https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=${eventfulApiKey}&q=halloween&l=${city}+arizona`;

    // $.ajax({
    //     url: queryUrl,
    //     method: "GET",
    // }).then(function(response) {
    //     let results = JSON.parse(response);

    //     var eventsLocs = [];
    //     for (let i = 0; i < results.events.event.length; i++) {

    //         eventsLocs.push(results.events.event[i].venue_address);

    //         let eventDiv = $("<div>").attr("class", "event-div");
    //         let eventTitle = $("<h3>").text(results.events.event[i].title);

    //         eventDiv.append(eventTitle);
    //         $(".events-col").append(eventDiv);
    //     };
    //     console.log(eventsLocs);

    //     myMap(eventsLocs);
    // });
})