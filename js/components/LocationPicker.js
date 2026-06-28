import { Button } from './Button.js';

// 'List of Location Buttons' Element Function
export function LocationPicker(locations, activeLocation, onClick) {                  // Passes the locations[] array, active location, and onClick handler to the function
    const container = document.createElement('div');                                  // Creates a <div> element in memory

    locations.forEach(function (location) {                                           // Call on each Location object in the array
        const isActive = activeLocation !== null && location.id === activeLocation; // Checks activeLocation for being not null and matching names with location, stores boolean
        const button = Button(location.name, location.id, isActive, onClick);                      // Turns a Location object into a <button> node using the LocationButton() function
        container.appendChild(button);                                                // Append the <button> node inside the <div> node
    });

    return container;  // Return the <div> node with all the <button> nodes appended
}