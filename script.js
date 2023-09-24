document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const weatherInfo = document.getElementById('weather-info');

    searchButton.addEventListener('click', () => {
        const location = searchInput.value;
        if (location) {
            getWeatherData(location);
        } else {
            alert('Please enter a location.');
        }
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const location = searchInput.value;
            if (location) {
                getWeatherData(location);
            } else {
                alert('Please enter a location.');
            }
        }
    })

    function getWeatherData(location) {
        const apiKey = '81901f53e210fc5afeae9dfd3cd1a1ea';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeatherInfo(data);
            })
            .catch(error => {
                console.error(error);
                alert('An error occurred while fetching weather data.');
            });
    }

    function displayWeatherInfo(data) {
        const cityName = data.name;
        const temperature = (data.main.temp - 273.15).toFixed(2);
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherDescription = data.weather[0].description;
        const weatherIcon = data.weather[0].icon;
        const isRainyOrStormy = weatherDescription.includes('rain') || weatherDescription.includes('storm');

        weatherInfo.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <p>Weather: ${weatherDescription}</p>
            <img src="https://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
        `;

        if (isRainyOrStormy) {
            document.body.style.backgroundImage = 'url("rain.jpg")';
        } else {
            document.body.style.backgroundImage = 'url("sunny.jpg")';
        }
    }
});
