import { Location } from './models/Location.js';
import { StringUtils } from './models/StringUtils.js';

// --------------------------------------------------------------------------------------------------------------------
// CONSTANTS
// --------------------------------------------------------------------------------------------------------------------

// Location objects stored as constants using the class constructor
const sanAntonio = new Location('San Antonio', 29.4241, -98.4936, 'TX');
const austin = new Location('Austin', 30.2672, -97.7431, 'TX');
const dallas = new Location('Dallas', 32.7767, -96.7970, 'TX');
const denver = new Location('Denver', 39.7392, -104.9903, 'CO');
const portland = new Location('Portland', 45.5152, -122.6784, 'OR');
const seattle = new Location('Seattle', 47.6062, -122.3321,'WA');
const newOrleans = new Location('New Orleans', 29.9511, -90.0715, 'LA');
const philadelphia = new Location('Philadelphia', 39.9526, -75.1652, 'PA');
const houston = new Location('Houston', 29.7604, -95.3698, 'TX');
const miami = new Location('Miami', 25.7617, -80.1918, 'FL');


// Creates an array of the declared Location objects
let locations = [sanAntonio, austin, dallas, denver, portland, seattle, newOrleans, philadelphia, houston, miami];



locations.forEach((location) => {
    let name = location.name;
    let id = StringUtils.convertToHTMLId(name);
    location.setId(id);
});



const locationsMap = new Map(locations.map((location) => {

    return[location.id, location];
}));



function getLocation(id) {
    return locationsMap.get(id);
}



function getLocations(stateCode) {             // Updated for stateCode usability
    
    if (stateCode == null) {                   // If no stateCode was provided...
        return Promise.resolve(locations);     // Async delivery of the locations[] array
    }
    
    let normalizedStateCode = stateCode.trim().toUpperCase();  // Normalization to all caps

    let matchingLocations = locations.filter(function (location) {     // Create a matchingLocations array by filtering locations...
        return location.stateCode === normalizedStateCode;             // for each location with a stateCode matching the parameter.
    });

    // **** Some kind of fail-safe for an empty matchingLocations return? ***

    return Promise.resolve(matchingLocations);    // Async delivery of matchingLocations[] array
}



export { getLocation, getLocations }; 
