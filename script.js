// QTYDK2XMT4N4JY9A2ECH92J7D


const fetchPromise = fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Uzbekistan?unitGroup=us&key=QTYDK2XMT4N4JY9A2ECH92J7D&contentType=json');


fetchPromise
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        };

        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });