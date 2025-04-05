// OUTPUT CONTAINER
const outputContainer = document.querySelector('.main-output');

// NOT FOUND MESSAGE
const notFoundMessage = document.querySelector('.not-found-error-message');

// SEARCH
const inputItself = document.querySelector('#inputItself');
const searchButton = document.querySelector('#searchButton');
let searchedCountry;

// FILTER
const filterButton = document.querySelector('#filterButton');
const filterDropDownContainer = document.querySelector('.main-output-header-weather-days-drop-down');
let isFilterMenuDropped = false;

// WEATHER
const weatherIcon = document.querySelector('#weatherIcon');
const countryNameText = document.querySelector('#countryNameText');
const countryTimeZoneText = document.querySelector('#countryTimeZoneText');
const temperatureText = document.querySelector('#temperatureText');
const temperatureDescriptionText = document.querySelector('#temperatureDescriptionText');
const feelsLikeText = document.querySelector('#feelsLikeText');
const humidityText = document.querySelector('#humidityText');
const windText = document.querySelector('#windText');
const snowText = document.querySelector('#snowText');
const sunriseText = document.querySelector('#sunriseText');
const sunsetText = document.querySelector('#sunsetText');
const date = new Date().toISOString().slice(0, 10);
let currentDate = date;

// SEARCH FOR WEATHER DATA

function searchForWeatherData() {
    const errorMessages = [];

    if (inputItself.value === '') {
        errorMessages.push('Empty input');
    };

    if (errorMessages.length === 0) {
        searchedCountry = inputItself.value;
        retrievingWeatherData();
        inputItself.value = '';
    };
};

// RETRIEVING WEATHER DATA

async function retrievingWeatherData() {
    try {
        const countryName = searchedCountry.toLowerCase();
        const request = new Request(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${countryName}?unitGroup=us&key=QTYDK2XMT4N4JY9A2ECH92J7D&contentType=json`);

        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(response.status);
        };
        
        notFoundMessage.classList.remove('not-found-error-message-active');
        const data = await response.json();

        filterData(data);
    } catch(error) {
        console.log(error);
        notFoundMessage.classList.add('not-found-error-message-active');
    };
};


// FILTERING THE DATA

function filterData(data) {
    filterDropDownContainer.innerHTML = '';
    for (let i = 0; i < data.days.length; i++) {
        const dropDownInner = document.createElement('div');
        dropDownInner.classList.add('main-output-header-weather-days-drop-down-inner');
        dropDownInner.textContent = data.days[i].datetime;

        dropDownInner.addEventListener('click', () => {
            for (const dropDownInner of filterDropDownContainer.children) {
                dropDownInner.classList.remove('main-output-header-weather-days-drop-down-inner-active');
            };
            dropDownInner.classList.add('main-output-header-weather-days-drop-down-inner-active');
            currentDate = data.days[i].datetime;

            retrievingWeatherData();
        });

        filterDropDownContainer.appendChild(dropDownInner);
    };

    countryNameText.textContent = data.address.toUpperCase();
    countryTimeZoneText.textContent = `Time Zone: ${data.timezone}`;

    displayTheWeatherData(data);
};

// FILTER DROPDOWN

function handlingTheFilterDropDown(e) {
    e.stopPropagation();

    if (isFilterMenuDropped === false) {
        filterDropDownContainer.classList.add('main-output-header-weather-days-drop-down-active');
        
        isFilterMenuDropped = true;
    } else {
        filterDropDownContainer.classList.remove('main-output-header-weather-days-drop-down-active');
        
        isFilterMenuDropped = false;
    };
};

window.addEventListener('click', () =>{
    filterDropDownContainer.classList.remove('main-output-header-weather-days-drop-down-active');
    isFilterMenuDropped = false;
});

// DISPLAY THE WEATHER DATA

function displayTheWeatherData(data) {
    const filteredItem = data.days.filter(item => item.datetime === currentDate);

    temperatureText.textContent = `${filteredItem[0].tempmax} / ${filteredItem[0].tempmin} °C`;
    temperatureDescriptionText.textContent = filteredItem[0].conditions;
    feelsLikeText.textContent = `Feels like: ${filteredItem[0].feelslike} °C`;
    windText.textContent = `Wind: ${filteredItem[0].windspeed} km/h`;
    humidityText.textContent = `Humidity: ${filteredItem[0].humidity} %`;
    snowText.textContent = `Snow: ${filteredItem[0].snow} mm`;
    sunriseText.textContent = `Sunrise: ${filteredItem[0].sunrise}`;
    sunsetText.textContent = `Sunset: ${filteredItem[0].sunset}`;

    outputContainer.classList.add('main-output-active');

    const iconName = filteredItem[0].icon;
    // ICON
    gettingIconData(iconName);
};

// GETTING ICON DATA

async function gettingIconData(iconName) {
    try {
        const response = await fetch('./icons.json');

        if (!response.ok) {
            throw new Error(response.status);
        };

        const data = await response.json();

        weatherIcon.textContent = data[iconName];
    } catch(error) {
        console.log(error);
    };
};

// INITIALIZING BUTTONS
filterButton.addEventListener('click', handlingTheFilterDropDown);
searchButton.addEventListener('click', e => {
    e.preventDefault();
    searchForWeatherData();
});