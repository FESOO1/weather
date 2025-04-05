// FILTER
const filterButton = document.querySelector('#filterButton');
const filterDropDownContainer = document.querySelector('.main-output-header-weather-days-drop-down');
let isFilterMenuDropped = false;

// WEATHER
const feelsLikeText = document.querySelector('#feelsLikeText');
const humidityText = document.querySelector('#humidityText');
const windText = document.querySelector('#windText');
const snowText = document.querySelector('#snowText');
const sunriseText = document.querySelector('#sunriseText');
const sunsetText = document.querySelector('#sunsetText');
let currentDate;

// RETRIEVING WEATHER DATA

async function retrievingWeatherData() {
    try {
        const request = new Request('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Uzbekistan?unitGroup=us&key=QTYDK2XMT4N4JY9A2ECH92J7D&contentType=json');

        const response = await fetch(request);

        const data = await response.json();

        filterData(data);
    } catch(error) {
        console.log(error);
    };
};

retrievingWeatherData();


// FILTERING THE DATA

function filterData(data) {
    for (let i = 0; i < data.days.length; i++) {
        const dropDownInner = document.createElement('div');
        dropDownInner.classList.add('main-output-header-weather-days-drop-down-inner');
        dropDownInner.textContent = data.days[i].datetime;
        if (i === 0) {
            currentDate = data.days[i].datetime;
            dropDownInner.classList.add('main-output-header-weather-days-drop-down-inner-active');
        };

        dropDownInner.addEventListener('click', () => {
            for (const dropDownInner of filterDropDownContainer.children) {
                dropDownInner.classList.remove('main-output-header-weather-days-drop-down-inner-active');
            };
            dropDownInner.classList.add('main-output-header-weather-days-drop-down-inner-active');
            currentDate = data.days[i].datetime;
        });

        filterDropDownContainer.appendChild(dropDownInner);
    };
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

filterDropDownContainer.addEventListener('click', e => e.stopPropagation());

// INITIALIZING BUTTONS
filterButton.addEventListener('click', handlingTheFilterDropDown);