/* const fetchPromise = fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Uzbekistan?unitGroup=us&key=QTYDK2XMT4N4JY9A2ECH92J7D&contentType=json'); */
const filterButton = document.querySelector('#filterButton');
const filterDropDownContainer = document.querySelector('.main-output-header-weather-days-drop-down');
let isFilterMenuDropped = false;

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