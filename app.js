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
const suggestionsDropdown = document.getElementById('suggestionsDropdown');

// Ice cream icons based on temperature - Amorino rose style
const iceCreamIcons = {
    melting: '🍦',  // > 20°C - Melting soft serve rose
    normal: '🍦',   // 10-20°C - Perfect rose ice cream
    frozen: '🍦'    // < 10°C - Frozen rose
};

// Helper function to get ice cream state based on temperature
function getIceCreamState(temp) {
    if (temp > 20) {
        return {
            icon: iceCreamIcons.melting,
            status: 'Attention, ta rose fond !',
            cssClass: 'melting'
        };
    } else if (temp < 10) {
        return {
            icon: iceCreamIcons.frozen,
            status: 'Ta rose est toute gelée',
            cssClass: 'frozen'
        };
    } else {
        return {
            icon: iceCreamIcons.normal,
            status: 'Parfait pour déguster ta rose',
            cssClass: 'normal'
        };
    }
}

// Search history management
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
let suggestionTimeout;

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
        hideSuggestions();
    }
});
cityInput.addEventListener('input', handleSearchInput);
cityInput.addEventListener('focus', handleSearchFocus);
locationBtn.addEventListener('click', handleGeolocation);

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        hideSuggestions();
    }
});

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
        addToSearchHistory(city);
        getWeatherByCity(city);
        cityInput.value = '';
        hideSuggestions();
    }
}

function handleSearchInput() {
    const query = cityInput.value.trim();

    clearTimeout(suggestionTimeout);

    if (query.length === 0) {
        showHistory();
    } else if (query.length >= 2) {
        suggestionTimeout = setTimeout(() => {
            showSuggestions(query);
        }, 300);
    } else {
        hideSuggestions();
    }
}

function handleSearchFocus() {
    if (cityInput.value.trim().length === 0) {
        showHistory();
    }
}

function addToSearchHistory(city) {
    // Remove if already exists
    searchHistory = searchHistory.filter(item => item.toLowerCase() !== city.toLowerCase());

    // Add to beginning
    searchHistory.unshift(city);

    // Keep only last 5
    searchHistory = searchHistory.slice(0, 5);

    // Save to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function showHistory() {
    if (searchHistory.length === 0) {
        hideSuggestions();
        return;
    }

    suggestionsDropdown.innerHTML = '<div class="suggestion-label">Historique</div>';

    searchHistory.forEach(city => {
        const item = document.createElement('div');
        item.className = 'suggestion-item history';
        item.innerHTML = `
            <span class="suggestion-icon">🕐</span>
            <span class="suggestion-text">${city}</span>
        `;
        item.addEventListener('click', () => {
            cityInput.value = city;
            handleSearch();
        });
        suggestionsDropdown.appendChild(item);
    });

    suggestionsDropdown.classList.add('show');
}

function showSuggestions(query) {
    // Popular French cities
    const cities = [
        'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Nantes',
        'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille', 'Rennes',
        'Reims', 'Le Havre', 'Saint-Étienne', 'Toulon', 'Grenoble',
        'Dijon', 'Angers', 'Nîmes', 'Villeurbanne', 'Le Mans',
        'Aix-en-Provence', 'Clermont-Ferrand', 'Brest', 'Tours',
        'Amiens', 'Limoges', 'Annecy', 'Perpignan', 'Boulogne-Billancourt',
        'Londres', 'New York', 'Tokyo', 'Berlin', 'Madrid', 'Rome',
        'Barcelone', 'Amsterdam', 'Bruxelles', 'Genève', 'Zurich',
        'Lisbonne', 'Dublin', 'Vienne', 'Prague', 'Copenhague',
        'Stockholm', 'Oslo', 'Helsinki', 'Varsovie', 'Budapest'
    ];

    const matches = cities.filter(city =>
        city.toLowerCase().startsWith(query.toLowerCase())
    ).slice(0, 8);

    if (matches.length === 0) {
        hideSuggestions();
        return;
    }

    suggestionsDropdown.innerHTML = '<div class="suggestion-label">Suggestions</div>';

    matches.forEach(city => {
        const item = document.createElement('div');
        item.className = 'suggestion-item';
        item.innerHTML = `
            <span class="suggestion-icon">📍</span>
            <span class="suggestion-text">${city}</span>
        `;
        item.addEventListener('click', () => {
            cityInput.value = city;
            handleSearch();
        });
        suggestionsDropdown.appendChild(item);
    });

    suggestionsDropdown.classList.add('show');
}

function hideSuggestions() {
    suggestionsDropdown.classList.remove('show');
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
    const temp = Math.round(current.main.temp);
    const iceCreamState = getIceCreamState(temp);

    // Update current weather
    document.getElementById('cityName').textContent = current.name;

    // Update ice cream icon - show the right SVG
    const weatherIconEl = document.getElementById('weatherIcon');
    // Hide all SVGs first
    weatherIconEl.querySelectorAll('.ice-cream-svg').forEach(svg => svg.style.display = 'none');

    // Show the appropriate SVG
    if (iceCreamState.cssClass === 'melting') {
        weatherIconEl.querySelector('.melting-ice').style.display = 'block';
    } else if (iceCreamState.cssClass === 'frozen') {
        weatherIconEl.querySelector('.frozen-ice').style.display = 'block';
    } else {
        weatherIconEl.querySelector('.normal-ice').style.display = 'block';
    }

    // Remove old classes and add new class for animations
    weatherIconEl.classList.remove('melting', 'normal', 'frozen');
    weatherIconEl.classList.add(iceCreamState.cssClass);

    document.getElementById('temperature').textContent = `${temp}°`;
    document.getElementById('iceCreamStatus').textContent = iceCreamState.status;
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
        const temp = Math.round(day.main.temp);
        const iceCreamState = getIceCreamState(temp);

        let svgContent = '';
        if (temp > 20) {
            // Melting ball
            svgContent = `
                <svg viewBox="0 0 200 300" class="ice-cream-svg-small">
                    <path d="M 70 180 L 100 280 L 130 180 Z" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
                    <ellipse cx="100" cy="140" rx="35" ry="40" fill="#FF69B4" opacity="0.95"/>
                    <ellipse cx="100" cy="135" rx="28" ry="33" fill="#FF1493" opacity="0.9"/>
                </svg>`;
        } else if (temp < 10) {
            // Frozen with crystals
            svgContent = `
                <svg viewBox="0 0 200 300" class="ice-cream-svg-small">
                    <path d="M 70 180 L 100 280 L 130 180 Z" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
                    <ellipse cx="85" cy="140" rx="20" ry="28" fill="#E8B5D8" opacity="0.95" transform="rotate(-30 85 140)"/>
                    <ellipse cx="115" cy="140" rx="20" ry="28" fill="#D8A5C8" opacity="0.95" transform="rotate(30 115 140)"/>
                    <ellipse cx="100" cy="125" rx="15" ry="22" fill="#D8A5C8" opacity="1"/>
                    <circle cx="100" cy="115" r="8" fill="#B885A8"/>
                    <path d="M 60 110 L 63 113 L 60 116 L 57 113 Z" fill="#B0E5FF" opacity="0.9" stroke="#87CEEB" stroke-width="0.8"/>
                    <path d="M 140 115 L 143 118 L 140 121 L 137 118 Z" fill="#B0E5FF" opacity="0.9" stroke="#87CEEB" stroke-width="0.8"/>
                </svg>`;
        } else {
            // Normal rose
            svgContent = `
                <svg viewBox="0 0 200 300" class="ice-cream-svg-small">
                    <path d="M 70 180 L 100 280 L 130 180 Z" fill="#D2691E" stroke="#8B4513" stroke-width="2"/>
                    <ellipse cx="85" cy="140" rx="20" ry="28" fill="#FF69B4" opacity="0.9" transform="rotate(-30 85 140)"/>
                    <ellipse cx="115" cy="140" rx="20" ry="28" fill="#FF1493" opacity="0.9" transform="rotate(30 115 140)"/>
                    <ellipse cx="90" cy="125" rx="15" ry="22" fill="#FF1493" opacity="0.95" transform="rotate(-15 90 125)"/>
                    <ellipse cx="110" cy="125" rx="15" ry="22" fill="#FF69B4" opacity="0.95" transform="rotate(15 110 125)"/>
                    <ellipse cx="100" cy="115" rx="12" ry="18" fill="#D4567F" opacity="1"/>
                    <circle cx="100" cy="110" r="8" fill="#C71585"/>
                </svg>`;
        }

        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div>
                <div class="forecast-date">${dayName}</div>
                <div class="forecast-desc">${day.weather[0].description}</div>
            </div>
            <div class="forecast-icon">
                ${svgContent}
            </div>
            <div class="forecast-temp">${temp}°C</div>
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
