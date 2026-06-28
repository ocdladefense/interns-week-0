// 'Location Display' Element Function
export function LocationInformation(location) {                        // Passes the Location object to the function
    const container = document.createElement('section');           // Creates a <section> node in memory

    // Else (if a button HAS been clicked)
    const cityName = document.createElement('h2');                          // Creates an <h2> node in memory
    const cityNametext = document.createTextNode('City: ' + location.name); // Creates a text node that concatenates the name value of the Location object

    const lat = document.createElement('p');                                // Creates a <p> node in memory
    const latText = document.createTextNode('Latitude: ' + location.lat);    // Creates a text node that concatenates the lat value of the Location object

    const lng = document.createElement('p');                                // Creates a <p> node in memory
    const lngText = document.createTextNode('Longitude: ' + location.lng);   // Creates a text node that concatenates the lng value of the Location object

    cityName.appendChild(cityNametext);      // Append the text node to the <h2> node
    container.appendChild(cityName);         // Append the <h2> node to the <section> node

    lat.appendChild(latText);                // Append the text node to the <p> node
    container.appendChild(lat);              // Append the <p> node to the <section> node

    lng.appendChild(lngText);                // Append the text node to the <p> node
    container.appendChild(lng);              // Append the <p> node to the <section> node

    return container; // Return the completed <section> node
}