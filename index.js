
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '97db128bda5b85f0638afbf11b2cd533';

function getWeather() {
    
    const cityName = document.getElementById('city-input').value.trim() || 'Noida';

    if (!cityName) {
        alert('Please enter a city.');
        return;
    }

  
    const fullUrl = `${API_URL}?q=${cityName}&appid=${API_KEY}&units=metric`;

   
    fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found. Please try again.');
            }
            return response.json();
        })
        .then(data => {
        
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert(error.message);
        });
}

function displayWeather(data) {
    document.getElementById('weather-info').classList.remove('d-none');
    document.getElementById('city-name').textContent = `Weather in ${data.name}`;
    document.getElementById('date').textContent = moment().format('MMMM Do YYYY, h:mm:ss a');
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    document.getElementById('temperature').textContent = `${data.main.temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('extra-info').innerHTML = `
        <p style="font-weight: bold; font-size: 18px; color: white;">Humidity: ${data.main.humidity}%</p>
        <p style="font-weight: bold; font-size: 18px; color: white;">Pressure: ${data.main.pressure} hPa</p>
    `;
}
