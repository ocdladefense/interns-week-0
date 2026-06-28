import { Location } from './models/Location.js';
import { StringUtils } from './models/StringUtils.js';

// --------------------------------------------------------------------------------------------------------------------
// CONSTANTS
// --------------------------------------------------------------------------------------------------------------------

// Location objects stored as constants using the class constructor
const sanAntonio = new Location('San Antonio', 29.4241, -98.4936);
const austin = new Location('Austin', 30.2672, -97.7431);
const dallas = new Location('Dallas', 32.7767, -96.7970);
const denver = new Location('Denver', 39.7392, -104.9903);
const portland = new Location('Portland', 45.5152, -122.6784);
const seattle = new Location('Seattle', 47.6062, -122.3321);
const newOrleans = new Location('New Orleans', 29.9511, -90.0715);
const philadelphia = new Location('Philadelphia', 39.9526, -75.1652);
const houston = new Location('Houston', 29.7604, -95.3698);
const miami = new Location('Miami', 25.7617, -80.1918);


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

console.log(locationsMap.get('san-antonio'));

function getLocation(id) {
    return locationsMap.get(id);
}

function getLocations() {
    return locations;
}

export {locations, getLocation, getLocations}; 
