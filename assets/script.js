$(document).ready(function(){
    let city = $("#city");

    //USER ENTERS CITY AND PRESSES BUTTON:
    $("#getInfo").click(function(){
        city = $("#city").val();
        displayInformation();
    });

    function displayInformation() {
        const apiKey = "&APPID=940bd19264df2f0bdcef88196b007f5f";
        const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);
                console.log(response);
         
                $(".location").html("<h3>Currently in " + response.name + "</h3><br>");
                $(".weather").html("Current conditions: " + response.weather[0].description + " <img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>");
                $(".coordinates").text("Coordinates: Lat:" + response.coord.lat + ", Lon: " + response.coord.lon);
                
                // PULLING LAT/LONG FROM WEATHER API TO THEN PULL INFO FROM SEECLICKFIX.COM
                let lat = response.coord.lat;
                let lon = response.coord.lon;
                const queryTwo = "https://seeclickfix.com/open311/v2/services.json?lat=" + lat + "&long=" + lon;

                $.ajax({
                    url: queryTwo,
                    method: "GET"
                })
                .then(function (responseTwo){
                    console.log(queryTwo);
                    console.log(responseTwo);
                    // $("#infoView").empty();
                    // const displayResults = [];
                    
                    // for(i = 0; i < responseTwo.length; i++)
                })
            });
    };

});