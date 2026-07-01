let root = null;
let component = null;


// =========================================================================================
// ========= THE AMAZING STATE MACHINE =====================================================
// =========================================================================================

// --- Initialize the state[] array and the stateIndex tracking variable. ----
let state = [];
let stateIndex = 0;


// ---- React-Like useState(), passing ONLY the initial value for the state. ----
export function useState(initialValue) {

    let setterIndex = stateIndex++;             // Hold the setterIndex at the current stateIndex, then increment stateIndex.
    
    if (!(setterIndex in state)) {              // If that index doesn't exist yet...
        state[setterIndex] = initialValue;      // Initialize it.
    }

    let currentValue = state[setterIndex];      // Snag that new value.
 
    function setState(newValue) {               // Nested setter function.
        state[setterIndex] = newValue;          // Set the value...
        fubar();                                // ...then rerender.
    }

    return [currentValue, setState];            // Return an array with the indexed value and the setter function.
}


// =========================================================================================
// ========= RENDERING FUNCTIONS ===========================================================
// =========================================================================================


// ---- Root creation passing a node tag to create the root as the type of node. ----

export function createRoot(node) {
    root = node;
    return {
        render: function (c) {
            component = c;
            root.replaceChildren();
            stateIndex = 0;
            root.appendChild(c());
        }
    };
}

// =========================================================================================


// ---- Rerendering function. It rerenders. Go figure. ----

function fubar() {
    root.replaceChildren();
    stateIndex = 0;
    root.appendChild(component());
}