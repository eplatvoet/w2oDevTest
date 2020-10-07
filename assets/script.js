$(document).ready(function(){
    console.log("READY!");
    let city = $("#city");

    //USER ENTERS CITY AND PRESSES BUTTON:
    $("#getInfo").click(function(){
        zip = $("#city").val();
        displayInformation();
    });

    function displayInformation() {
        const apiKey = "&APPID=940bd19264df2f0bdcef88196b007f5f";
        const queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + apiKey;
        
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
                .then(function (services){
                    console.log(queryTwo);
                    console.log(services);
                    display();
                    let pubServ = services[i];
                    console.log(pubServ);
                    console.log(pubServ[3].service_name)
                })

                function display(services) {
                $("#infoView").empty();
                const displayResults = [];
                
                    for(i = 0; i < services[i].length; i++) {
                        displayResults.push(createNewDisplay(services[i]));
                    }
                    $("#infoView").append(displayResults);
                }

                function createNewDisplay(services) {
                    const newCol = $("<div class ='col-xs-3'>");
                    const org = $("<h5>");
                    const servName = $("<p>");

                    org.text(pubServ.organization);
                    servName.text(pubServ.service_name);

                    $(newCol).append(org);
                    $(org).append(servName);
                    return newCol;
            }
            });
    };

});