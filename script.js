const boxSearch = document.querySelector('.container-search');
const boxWeather = document.querySelector('.container-weather');
const search = document.querySelector('.search-box button');

search.addEventListener('click', () => {

  const APIKey = 'YOUR API KEY HERE';
  const city = document.querySelector('.search-box input').value;

  if (city === '') {
    return;
  }

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        return;
      }

      const image = document.querySelector('.card img');
      const city = document.querySelector('.mainsub span');
      const temperature = document.querySelector('.main span');
      const humidity = document.querySelector('.humiditytext span');
      const wind = document.querySelector('.airtext span');
      const aqi = document.querySelector('.aqitext span');
      const realFeel = document.querySelector('.realfeeltext span');
      const pressure = document.querySelector('.pressuretext span');

      boxSearch.style.display = 'none';
      boxWeather.style.display = 'flex';

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = './assets/clear.png';
          break;

        case 'Rain':
          image.src = './assets/rain.png';
          break;

        case 'Snow':
          image.src = './assets/snow.png';
          break;
        
        case 'Clouds':
          image.src = './assets/cloud.png';
          break;
        
        case 'Haze':
          image.src = './assets/mist.png';
          break;

        default:
          image.src = '';
      }

      city.innerHTML = `${json.name}, ${json.sys.country}`;
      temperature.innerHTML = `${parseInt(json.main.temp)} °C`;
      humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
      aqi.innerHTML = `${json.weather[0].main}`;
      realFeel.innerHTML = `${parseInt(json.main.feels_like)} °C`;
      pressure.innerHTML = `${parseInt(json.main.pressure)} mbar`;
    });
});