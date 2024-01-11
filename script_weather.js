const apiKey = "8297221c06801f8c02f1de2217533192";
const weatherInfo = document.getElementById("weatherInfo");

async function getWeather() {
  const cityInput = document.getElementById("cityInput").value;

  if (cityInput === "") {
    alert("Please enter a city name.");
    return;
  }

  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found. Please enter a valid city name.");
      return;
    }

    const weatherHtml = `
            <p><strong>City:</strong> ${data.name}, ${data.sys.country}</p>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        `;

    weatherInfo.innerHTML = weatherHtml;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("An error occurred while fetching weather data. Please try again.");
  }
}