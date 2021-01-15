// Foursquare API Info
const clientId = 'EHYEAPQTEAE5LEZHNTNU5NTWU2FJJCP1LLO3N2KPWYD4AKIV';
const clientSecret = '5443SBA1BB4HBDVYXN1XJ2G3PEWXPF5213YAKKRHP0OYT2IQ';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';
const venuesAmount = 7; //как много венючек нам надо
function YYYYMMDD(){    //Выдаёт сегодняшнюю дату в формате ГГГГММДД,автоматически ставит 0 перед месяцем <10
    let todayRawDate = new Date();
    let year = todayRawDate.getFullYear();
    let month = todayRawDate.getMonth()+1;
    let day = todayRawDate.getDate();
    if (month < 10) {
        return `${year}0${month}${day}`;
    }
    else return `${year}${month}${day}`;
}

// OpenWeather Info
const openWeatherKey = '293d97e7168d03850afcd26dc62fd59b';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")]; // здесь мы определяем, сколько веню-дивов будет заполнено
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekDaysRus = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

// Add AJAX functions here:
const getVenues = async () => {  // функция добывания ВЕНЮЧЕК
    const city = $input.val();  //вводим название города
    const urlToFetch =
        `${url}${city}&limit=${venuesAmount}&client_id=${clientId}&client_secret=${clientSecret}&v=${YYYYMMDD()}` //

    try{
        const response = await fetch(urlToFetch);
        if(response.ok) {
            const jsonResponse = await response.json();
            console.log(response);
            const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
            console.log(`вот выводятся венючки, всего их ${venuesAmount}`);
            console.log(venues);
            return venues;
        }
    }
    catch(error){console.log(error);}

}

const getForecast = async() => {
    const urlToFetch = `${weatherUrl}?q=${$input.val()}&APPID=${openWeatherKey}`
    try{
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            console.log(`сегодняшняя дата: ${YYYYMMDD()}`);
            return jsonResponse;
        }
    }
    catch(error){console.log(error);}

}


// Render functions
const renderVenues = (venues) => {
    $venueDivs.forEach(($venue, index) => {
        // Add your code here:
        const venue = venues[index];
        const venueIcon = venue.categories[0].icon;
        const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
        let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc); //вот вызов венючной-HTML функции из Хелпера!!!
        $venue.append(venueContent);
    });
    $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
    // Add your code here:
    let weatherContent = createWeatherHTML(day);              //вот вызов погодной-HTML функции из Хелпера!!!
    $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
    $venueDivs.forEach(venue => venue.empty());
    $weatherDiv.empty();
    $destination.empty();
    $container.css("visibility", "visible");
    getVenues().then(venues => renderVenues(venues));
    getForecast().then(forecast => renderForecast(forecast));
    return false;
}

$submit.click(executeSearch)