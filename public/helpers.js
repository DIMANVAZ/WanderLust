const createVenueHTML = (name, location, iconSource) => { //эта функция определяет скелет (из чего состоит) венюшка
    return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>Address:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
}

const createWeatherHTML = (currentDay) => { //эта функция определяет скелет (из чего состоит) ПОГОДНЫЙ ВИДЖЕТ
    console.log(currentDay)
    return `<h2>${weekDaysRus[(new Date()).getDay()]}</h2>      <!--по индексу дня недели от 0 до 6 (видимо) от 
                                        текущей даты берётся название дня недели из массива--> 
                                                        
		<h2>Temperature: ${kelvinToCelsius(currentDay.main.temp)}&deg;C</h2>
		<h2>Condition: ${currentDay.weather[0].description}</h2>
		<h2>Влажность: ${currentDay.main.humidity} %</h2>
  	<img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
}

const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);
const kelvinToCelsius = k => (k - 273.15).toFixed(0);