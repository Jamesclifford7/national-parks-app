/* API key: 9fT68KBopS7FWqI9K9Yrax0uJveq53yIx4tWBHvk */

/* base url: developer.nps.gov/api/v1 */

/* retrieve input value */

function getInputValue() {
    console.log('getInputValue() is running');
    const enteredState = $('#state').val();
    return enteredState;
}

/* retrieve number of parks value */

function getLimitNumber() {
    console.log('getLimitNumber() is running');
    const enteredAmount = $('#listings-amount').val();
    return enteredAmount;
}

/* get park(s) info */

function getParks() {
    fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${getInputValue()}&api_key=9fT68KBopS7FWqI9K9Yrax0uJveq53yIx4tWBHvk&limit=${getLimitNumber()}`)
        .then(function(response){
            return response.json()
        })
        .then(function(responseJson){
            if (responseJson.total >= 1) {
                return displayResults(responseJson)
            } else {
                throw new Error ('please enter a valid two-character State abbreviation')
            }
        })
        .catch(function(error) {
            alert(error)
        });
}

/* display name, description, and url of parks */

function displayResults(responseJson) {
    for (i = 0; i < responseJson.data.length; i++) {
        $('.results-container').append(`
        <div class="results">
            <h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}"><p>${responseJson.data[i].url}</p></a>
        </div>`)
    };
}

/* clear results */

function clearResults() {
    $('.form-container').on('click', '.clear-button', function(event){
        $('.results').remove();
        $('#state').val('');
        $('#listings-amount').val('10');
    })
}

function watchApp() {
    $('form').on('submit', function(event){
        event.preventDefault();
        getParks();
        clearResults();
    })
} 

watchApp();
