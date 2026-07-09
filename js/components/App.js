import { LocationPicker } from './LocationPicker.js';
import { LocationInformation } from './LocationInformation.js';
import { NoLocationSelected } from './NoLocationSelected.js';
import { MyError } from './MyError.js';
import { getLocation, getLocations } from '../data.js';
import { useState, useEffect } from '../utils/react/client.js';
import { History } from '../models/History.js';
import { StatePicker } from './StatePicker.js';

// --------------------------------------------------------------------------------------------------------------------
// TOP LEVEL RENDERING FUNCTION
// --------------------------------------------------------------------------------------------------------------------
const appEvents = new EventTarget();                  // Creates an EventTarget, a shared object to send/receive app level events

const locationHistory = new History();                // Creates a state object from the History class to track button click history
locationHistory.listenForLocationChanges(appEvents);  // Start the event listener in locationHistory to listen for locationChange through appEvent


// ---- Main App Export Function ----

export function App() {

    // -- React-like useState calls, return indexed values and setter functions --
    let [locations, setLocations] = useState([]);
    let [activeLocationId, setActiveLocationId] = useState(null);

    let [stateCode, setStateCode] = useState("OR");
    let stateCodes = ['OR', 'TX', 'LA', 'CO', 'WA', 'PA', 'FL'];  // Change this to use available locations to filter out available stateCodes, probably in data.js


    // -- React-like useEffect --
    useEffect(function () {
        // getLocations returns a promise, and we store it in loadedLocations when it resolves
        getLocations(stateCode).then(function (loadedLocations) {
            // then store the data in the useState slot for the locations array for tracking changes.
            setLocations(loadedLocations);
            setActiveLocationId(null);     // Default screen if stateCode changes while activeLocation doesn't have the correct stateCode.
        });
    }, [stateCode]);


    // ---- Nested click-handler functions ----

    function onLocationClick(cityId) {

        setActiveLocationId(cityId);                                     // Changes the state variable to the location from the last button clicked
        const locationChangeEvent = new CustomEvent('locationChange', {  // CustomEvent to signal change of activeLocation and carry the city ID
            detail: {                                                    // Add event promise details (event.detail)
                id: cityId                                               // Apply cityId variable to event.detail.id
            }
        });


        appEvents.dispatchEvent(locationChangeEvent);    // Dispatches locationChange event to appEvents() (*our EventTarget()*)
    }

    function onStateClick(selectedStateCode) {
        setStateCode(selectedStateCode);
        setActiveLocationId(null);
    }


    // -----------------------------------------------------------------------------------------

    let container = document.createElement('div');               // Creates a <div> parent node in memory
    let main;

    if (activeLocationId == null) {            // If it's null...
        main = NoLocationSelected();           // use the default page.
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

    let stateButtons = StatePicker(stateCodes, stateCode, onStateClick);

    let locationButtons = LocationPicker(locations, activeLocationId, onLocationClick);

    container.appendChild(stateButtons);
    container.appendChild(locationButtons);
    container.appendChild(main);

    return container;
}