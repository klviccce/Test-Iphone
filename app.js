// API Configuration - OpenWeatherMap (gratuit)
// Vous devrez obtenir votre propre clé API sur https://openweathermap.org/api
const API_KEY = '3afb1809129c93adce086382142359c5'; // Remplacez par votre clé API
const API_URL = 'https://api.openweathermap.org/data/2.5';

// Elements DOM
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const currentWeather = document.getElementById('currentWeather');
const forecastContainer = document.getElementById('forecastContainer');

// Weather icons mapping
const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
};

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});
locationBtn.addEventListener('click', handleGeolocation);

// Initialize app
init();

function init() {
    // Check if API key is set
    if (API_KEY === 'VOTRE_CLE_API_ICI') {
        showError('⚠️ Veuillez configurer votre clé API OpenWeatherMap dans app.js');
        return;
    }

    // Load last searched city from localStorage
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        getWeatherByCity(lastCity);
    } else {
        // Default to Paris
        getWeatherByCity('Paris');
    }

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .catch(err => console.log('Service Worker registration failed:', err));
    }
}

function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherByCity(city);
        cityInput.value = '';
    }
}

function handleGeolocation() {
    if (!navigator.geolocation) {
        showError('❌ La géolocalisation n\'est pas supportée par votre navigateur');
        return;
    }

    showLoading();
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            getWeatherByCoords(latitude, longitude);
        },
        (err) => {
            hideLoading();
            showError('❌ Impossible d\'obtenir votre position. Vérifiez les autorisations.');
        }
    );
}

async function getWeatherByCity(city) {
    try {
        showLoading();

        // Get current weather
        const weatherResponse = await fetch(
            `${API_URL}/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`
        );

        if (!weatherResponse.ok) {
            throw new Error('Ville non trouvée');
        }

        const weatherData = await weatherResponse.json();

        // Get forecast
        const forecastResponse = await fetch(
            `${API_URL}/forecast?q=${city}&units=metric&lang=fr&appid=${API_KEY}`
        );

        const forecastData = await forecastResponse.json();

        // Save to localStorage
        localStorage.setItem('lastCity', city);

        // Display data
        displayWeather(weatherData, forecastData);
        hideLoading();

    } catch (err) {
        hideLoading();
        showError(`❌ ${err.message}`);
    }
}

async function getWeatherByCoords(lat, lon) {
    try {
        // Get current weather
        const weatherResponse = await fetch(
            `${API_URL}/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
        );

        const weatherData = await weatherResponse.json();

        // Get forecast
        const forecastResponse = await fetch(
            `${API_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
        );

        const forecastData = await forecastResponse.json();

        // Save city to localStorage
        localStorage.setItem('lastCity', weatherData.name);

        // Display data
        displayWeather(weatherData, forecastData);
        hideLoading();

    } catch (err) {
        hideLoading();
        showError(`❌ ${err.message}`);
    }
}

function displayWeather(current, forecast) {
    // Update current weather
    document.getElementById('cityName').textContent = current.name;
    document.getElementById('weatherIcon').textContent = weatherIcons[current.weather[0].icon] || '🌤️';
    document.getElementById('temperature').textContent = `${Math.round(current.main.temp)}°`;
    document.getElementById('weatherDescription').textContent = current.weather[0].description;
    document.getElementById('wind').textContent = `${Math.round(current.wind.speed * 3.6)} km/h`;
    document.getElementById('humidity').textContent = `${current.main.humidity}%`;
    document.getElementById('feelsLike').textContent = `${Math.round(current.main.feels_like)}°`;

    // Show current weather
    currentWeather.classList.add('show');

    // Display forecast (next 5 days, one per day at noon)
    displayForecast(forecast);
}

function displayForecast(forecast) {
    const forecastList = document.getElementById('forecastList');
    forecastList.innerHTML = '';

    // Filter forecast to get one per day (at 12:00)
    const dailyForecasts = forecast.list.filter(item =>
        item.dt_txt.includes('12:00:00')
    ).slice(0, 5);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('fr-FR', { weekday: 'long' });

        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div>
                <div class="forecast-date">${dayName}</div>
                <div class="forecast-desc">${day.weather[0].description}</div>
            </div>
            <div class="forecast-icon">${weatherIcons[day.weather[0].icon] || '🌤️'}</div>
            <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
        `;

        forecastList.appendChild(forecastItem);
    });

    forecastContainer.classList.add('show');
}

function showLoading() {
    loading.classList.add('show');
    error.classList.remove('show');
    currentWeather.classList.remove('show');
    forecastContainer.classList.remove('show');
}

function hideLoading() {
    loading.classList.remove('show');
}

function showError(message) {
    error.querySelector('.error-message').textContent = message;
    error.classList.add('show');
    currentWeather.classList.remove('show');
    forecastContainer.classList.remove('show');
}
