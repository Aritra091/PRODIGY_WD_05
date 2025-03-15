const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weatherImg = document.createElement('img'); // Dynamically create weather image
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

const locationNotFound = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

const API_KEY = "b548434fd05cf6ef03f2a5cd1400d837";

// Function to fetch and update weather data
async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const weatherData = await response.json();

        if (weatherData.cod === "404") {
            locationNotFound.style.display = "flex";
            weatherBody.style.display = "none";
            console.error("Location not found");
            return;
        }

        // Display weather details
        locationNotFound.style.display = "none";
        weatherBody.style.display = "flex";
        temperature.innerHTML = `${Math.round(weatherData.main.temp)}°C`;
        description.innerHTML = weatherData.weather[0].description;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed} Km/H`;

        // Update Weather Icon
        updateWeatherIcon(weatherData.weather[0].main);
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again.");
    }
}

// Function to update weather icon dynamically
function updateWeatherIcon(condition) {
    let iconSrc = "default.png"; // Default icon

    condition = condition.toLowerCase();

    if (condition.includes("clear")) {
        iconSrc = "clear.png";
    } else if (condition.includes("cloud")) {
        iconSrc = "cloud.png";
    } else if (condition.includes("rain")) {
        iconSrc = "rain.png";
    } else if (condition.includes("drizzle")) {
        iconSrc = "drizzle.png";
    } else if (condition.includes("thunderstorm")) {
        iconSrc = "storm.png";
    } else if (condition.includes("snow")) {
        iconSrc = "snow.png";
    } else if (condition.includes("mist") || condition.includes("fog") || condition.includes("haze")) {
        iconSrc = "mist.png";
    } else if (condition.includes("smoke") || condition.includes("dust") || condition.includes("sand") || condition.includes("ash")) {
        iconSrc = "haze.png";
    } else if (condition.includes("tornado") || condition.includes("squall") || condition.includes("hurricane")) {
        iconSrc = "storm.png"; // Use storm icon for extreme weather
    
    }

    weatherImg.src = iconSrc;
    weatherImg.alt = condition;
    weatherImg.style.width = "100px"; // Adjust size
    weatherImg.style.height = "100px";

    if (!document.querySelector(".weather-img")) {
        document.querySelector(".weather-box").prepend(weatherImg);
    }
}

// Event listeners for search button & Enter key
searchBtn.addEventListener('click', () => checkWeather(inputBox.value));
inputBox.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        checkWeather(inputBox.value);
    }
});
