function main (){
  document.getElementById("searchButton").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = "bab7f2d189f8bc423e0841fbe0c0538f"; // Your actual API key
    const weatherDataDiv = document.getElementById("weatherData");
    const error404 = document.querySelector(".not-found");
    const mainDisplay = document.querySelector(".container");

    // Clear previous weather data
    weatherDataDiv.innerHTML = '<div class="spinner"></div>';

    // Fetch weather data
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    )
      .then((response) => {
        console.log("Response:", response); // Log the entire response
        if (!response.ok) {
          if (response.status === 404) {
            mainDisplay.style.height = '500px'
            error404.classList.add("active");
            throw new Error("City not found");
          } else {
            mainDisplay.style.height = '500px'
            error404.classList.add("active");
            throw new Error("Error fetching data");
          }
        } else {
          error404.classList.remove("active");
          mainDisplay.style.height = '720px'
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data); // Log the data object

        // Get the weather image
        let weatherCondition = data.weather[0].main;
        function getImage(weatherCondition) {
          let imageSrc;

          if (weatherCondition === "Clear") {
            imageSrc = "images/sunny.png";
          } else if (weatherCondition === "Drizzle") {
            imageSrc = "images/raining.png";
          } else if (weatherCondition === "Rain") {
            imageSrc = "images/heavy_rain.png";
          } else if (weatherCondition === "Snow") {
            imageSrc = "images/snowy.png";
          } else if (weatherCondition === "Clouds") {
            imageSrc = "images/cloudy.png";
          } else if (weatherCondition === "Mist") {
            imageSrc = "images/foggy.png";
          } else if (weatherCondition === "Thunderstorm") {
            imageSrc = "images/thunderstorm.png";
          } else {
            imageSrc = "images/sunny_cloudy.png";
          }
          return imageSrc;
        }
        const weatherImageSrc = getImage(weatherCondition);

        // Update the innerHTML with weather data
        weatherDataDiv.innerHTML = `
          <h2 class="location">${data.name}</h2>
          <img class="weather-image" src="${weatherImageSrc}" />
          <p class="temperature">
            ${(data.main.temp - 273.15).toFixed(0)} <span>°C</span>
          </p>
          <p class="description">${data.weather[0].description}</p>
          <div class="additional-info">
            <div class="humidity">
              <i class="bx bx-droplet"></i>
              <p>
                <span id="humidity">${data.main.humidity} %</span>
                <br />
                Humidity
              </p>
            </div>
            <div class="wind">
              <i class="bx bx-wind"></i>
              <p>
                <span id="windSpeed">${data.wind.speed} m/s</span>
                <br />
                Wind Speed
              </p>
            </div>
          </div>
        `;
      })
      .catch((error) => {
        console.error("Error:", error.message);
        weatherDataDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      });
  });
}
main();  