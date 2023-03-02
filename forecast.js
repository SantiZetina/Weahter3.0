search.addEventListener('click', () => {
    const APIKey = '725df7184af4b24b878a3b2877922076';
    const city = searchBar.value;
  
    // If no city name entered, exit function
    if (city === '') return;
  
    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
      .then(res => res.json())
      .then(json => {
        // If city not found, display error message
        if (json.cod === '404') {
          container.style.height = '400px';
          weatherContent.style.display = 'none';
          weatherDetails.style.display = 'none';
          error404.style.display = 'block';
          error404.classList.add('fadeIn');
          return;
        }
  
        // Otherwise, hide error message
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');
  
        // Choose weather icon based on API response
        switch (json.weather[0].main) {
          case 'Clear':
            weatherIcon.src = 'images/clear.png';
            break;
          case 'Cloudy':
            weatherIcon.src = 'images/cloudy.png';
            break;
          case 'Rain':
            weatherIcon.src = 'images/rain.png';
            break;
          case 'Snow':
            weatherIcon.src = 'images/snowy.png';
            break;
          case 'Haze':
            weatherIcon.src = 'images/haze.png';
            break;
          default:
            weatherIcon.src = '';
        }
  
        // Update displayed temperature, weather description, humidity, and wind speed
        temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        desc.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
  
        // Show weather information and animate its appearance
        weatherContent.style.display = '';
        weatherDetails.style.display = '';
        weatherContent.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
  
        // Adjust container height to fit weather information
        container.style.height = '600px';
  
        // Fetch forecast data from OpenWeatherMap API
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`)
          .then(res => res.json())
          .then(json => {
            // Get the forecast items from the API response
            const forecastItems = json.list;
  
            // Generate HTML for the forecast items
            const forecastHTML = forecastItems.map(item => {
              // Extract the date and time from the forecast item
              const dt = new Date(item.dt * 1000);
              const date = dt.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
              const time = dt.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  
              // Generate the HTML for the forecast item
              return `
                <div class="forecast-item">
                  <div class="forecast-time">${time}</div>
                  <div class="forecast-date">${date}</div>
                  <div class="forecast-icon"><img src="images/${item.weather[0].icon}.png" alt="${item.weather[0].description}" title="${item.weather[0].description}"></div>
                  <div class="forecast-temp">${parseInt(item.main.temp)}<span>°C</span></div>
                </div>
              `;
            }).join
  