/* Grap DOM elements */

const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

/* Search destinations.json and filter it */
const searchDestinations = async searchText => {
    /* Getting data from destinations.json with the fetch api */
    const res = await fetch('../data/destinations.json');
    const destinations = await res.json();

    /* Simple regex to Get matches to current text input */
    let matches = destinations.filter(destination => {
        /* Create a regular expression to match starting with search text no matter the case */
        const regex = new RegExp(`^${searchText}`, 'gi');
        /* return and array that matches the regex */
        return destination.location.match(regex) || destination.side.match(regex);
    });

    console.log(matches);
};


/* Fire off event whenever typing in the input box */
search.addEventListener('input', () => searchDestinations(search.value));