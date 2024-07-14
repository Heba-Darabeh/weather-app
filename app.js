document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'e82de09dfc46d7d7b643974fdd2c3ce5';
    const searchInput = document.querySelector('.search-bar');
    const weatherInfo = document.querySelector('.city-weather-section')

    document.querySelector('.search-button')
        .addEventListener('click', () => {
        const location = searchInput.value;
        if (location) {
            fetchWeather(location)
        } else {
            alert('Please enter a city name.')
        }
    })

    async function fetchWeather(location) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            if (!response.ok) {
                throw new Error('Location not found')
            }
            const data = await response.json()
            displayWeather(data)
        } catch (error) {
            weatherInfo.innerHTML = `<p>${error.message}</p>`
        }
    }

    function displayWeather(data) {
        const { name } = data;
        const { temp } = data.main;
        const { description, icon } = data.weather[0];
        const { dt } = data;

        const date = new Date(dt * 1000).toLocaleDateString();

        weatherInfo.innerHTML = `
            <div class="city-date-div">
                <span class="city-name">${name}</span>
                <span class="date">${date}</span>
            </div>
             <div class="weather-status-section">
                <img class="weather-status-icon" src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
            </div>
            <div class="weather-description-section">
                <span class="degree">${temp}°C</span>
                <span class="weather-description">${description}</span>
            </div>
        `
    }

})
