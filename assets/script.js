$(document).ready(function () {
  let zip = $("#city");

  //USER ENTERS CITY AND PRESSES BUTTON:
  $("#getInfo").click(function () {
    zip = $("#city").val();
    displayInformation();
  });

  function displayInformation() {
    //INITIAL API CALL THAT WILL GRAB LAT/LON FROM RESULT
    const apiKey = "&APPID=940bd19264df2f0bdcef88196b007f5f";
    const queryURL =
      "https://api.openweathermap.org/data/2.5/weather?zip=" + zip + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      //ADDING CONTENT TO INDEX.HTML
      $(".location").html("<h3>" + response.name + "</h3><br>");
      $(".coordinates").text(
        "Coordinates: Lat:" +
          response.coord.lat +
          ", Lon: " +
          response.coord.lon
      );
      $(".weather").html(
        "Current conditions: " +
          response.weather[0].description +
          " <img src='https://openweathermap.org/img/w/" +
          response.weather[0].icon +
          ".png'>"
      );

      // PULLING LAT/LONG FROM WEATHER API TO THEN PULL INFO FROM SEECLICKFIX.COM
      let lat = response.coord.lat;
      let lon = response.coord.lon;
      const queryTwo =
        "https://seeclickfix.com/open311/v2/services.json?lat=" +
        lat +
        "&long=" +
        lon;

      $.ajax({
        url: queryTwo,
        method: "GET",
        dataType: "jsonp",
        crossDomain: true,
      }).then(function (services) {
        display(services);
        console.log(queryTwo);
        console.log(services);
      });
    });
  }

  //FUNCTION THAT WILL MAP THROUGH RESULTS THEN DISPLAY
  function display(services) {
    $("#infoView").empty();
    let mappedResults = services.map((service) => {
      let newObj = {
        organization: service.organization,
        service_name: service.service_name,
      };

      let newCol = $("<div class ='card'>");
      let org = $("<h5>");
      let servName = $("<p>");

      org.text(newObj.organization);
      servName.text(newObj.service_name);

      $(newCol).append(org);
      $(org).append(servName);
      return newCol;
    });
    $("#infoView").append(mappedResults);
  }
});
