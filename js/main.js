/* Grap DOM elements */
const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
let destinations;

/* get destinations.json and filter it */
const getDestinations = async () => {
    /* Getting data from destinations.json with the fetch api */
    const res = await fetch('../data/destinations.json');
    destinations = await res.json();
};

/* Filter destinations */
const searchDestinations = searchText => {
    /* Simple regex to Get matches to current text input */
    let matches = destinations.filter(destination => {
        /* Create a regular expression to match starting with search text no matter the case */
        const regex = new RegExp(`^${searchText}`, 'gi');
        /* return and array that matches the regex */
        return destination.location.match(regex) || destination.abbr.match(regex);
    });


    /* Prevent entire array from showing when input is empty */
    if (searchText.length === 0 || searchText.length > 3) {
        matches = [];
        matchList.innerHTML = '';
    }

    /* Show Results in HTML */
    outputHtml(matches);
};

/* Show Results in HTML */
const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
            <div class='card card-body mb-1'>
                <h4>${match.name} (${match.abbr})<br /> <span class="text-success">${match.location}</span>
                </h4>
                <small class="text-warning">Side of the island: ${match.side}</small>
                <small class="text-warning">Distance from Capital: ${match.distance} km / ${match.drive} mins</small>

            </div>    
        `
        ).join('');
        matchList.innerHTML = html;
    }
};

window.addEventListener('DOMContentLoaded', getDestinations);
/* Fire off event whenever typing in the input box */
search.addEventListener('input', () => searchDestinations(search.value));