import { LocationPicker } from './LocationPicker.js';
import { LocationInformation } from './LocationInformation.js';
import { NoLocationSelected } from './NoLocationSelected.js';
import { MyError } from './MyError.js';
import { getLocation, getLocations } from '../data.js';
import { useState } from '../utils/react/client.js';
import { History } from '../models/History.js';

// --------------------------------------------------------------------------------------------------------------------
// TOP LEVEL RENDERING FUNCTION
// --------------------------------------------------------------------------------------------------------------------

const appEvents = new EventTarget();            // Creates an EventTarget, a shared object to send/receive app level events

const locationHistory = new History();                // Creates a state object from the History class to track button click history
locationHistory.listenForLocationChanges(appEvents);  // Start the event listener in locationHistory to listen for locationChange through appEvent

export function App() {
    let locations = getLocations();
    let [activeLocationId, setActiveLocationId] = useState(null, "activeLocationId");

    function onLocationClick(cityId) {
        setActiveLocationId(cityId);                                     // Changes the state variable to the location from the last button clicked
        const locationChangeEvent = new CustomEvent('locationChange', {  // CustomEvent to signal change of activeLocation and carry the city ID
            detail: {                                                    // Add event promise details (event.detail)
                id: cityId                                               // Apply cityId variable to event.detail.id
            }
            // ***The "event contract" becomes (Event type: 'locationChange', City name location: event.detail.id)***
        });

        appEvents.dispatchEvent(locationChangeEvent);    // Dispatches locationChange event to appEvents() (*our EventTarget()*)
    }

    let container = document.createElement('div');                                               // Creates a <div> parent node in memory
    let main;

    if (activeLocationId == null) {
        main = NoLocationSelected();
    }

    else if (activeLocationId != null) {
        let matching = getLocation(activeLocationId);
        if (!matching) {
            main = MyError('No Data Found For Selected City!')
        }
        else {
            main = LocationInformation(matching);
        }
    }


    let locationButtons = LocationPicker(locations, activeLocationId, onLocationClick);        // Stores the <div> child node                                  // Stores the <section> node

    container.appendChild(locationButtons);   // Append the <div> child node inside the the <div> parent node
    container.appendChild(main);              // Append the <section> child node to the <div> parent node

    return container;       // Returns the <div> parent node
}