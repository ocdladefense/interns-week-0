let root = null;
let component = null;
let isProcessing = false;

// "The Microtask Queue" 
let updateQueue = [];


// =========================================================================================
// ========= THE AMAZING STATE MACHINE =====================================================
// =========================================================================================

// --- Initialize the state[] and effects[] arrays and the stateIndex and effectIndex variables. ----
let state = [];
let stateIndex = 0;



// ---- React-Like useState(), passing ONLY the initial value for the state. ----
export function useState(initialValue) {

    let setterIndex = stateIndex++;             // Hold the setterIndex at the current stateIndex, then increment stateIndex.

    if (!(setterIndex in state)) {              // If that index doesn't exist yet...
        state[setterIndex] = initialValue;      // Initialize it.
    }

    let currentValue = state[setterIndex];      // Snag that new value.

    let setterFn = function(val) {             // Async setter, queue up the setter calls
        sendEvent({ type: "stateUpdate", index: setterIndex, value: val });
    };

    return [currentValue, setterFn];            // Return an array with the indexed value and the setter function.
}



// ---- Method to add updates to the queue ----
function sendEvent(eventPayload) {

    updateQueue.push(eventPayload);

    // Defer the processing of the queue
    if (!isProcessing) {

        isProcessing = true;

        let thePromise = Promise.resolve();

        thePromise.then(() => {processQueue();});
    }
}




// ---- Method to process the queued updates ----
function processQueue() {

    console.log("Processing update queue:", updateQueue);

    let currentState = state;


    // Iterate through all updates, ensuring each uses the result of the previous one
    while (updateQueue.length > 0) {
        const event = updateQueue.shift();

        // Apply transition logic to calculate the next state
        // currentState = calculateNextState(currentState, event);
        currentState[event.index] = event.value;
    }


    // Apply the final consolidated state and trigger side effects/renders
    state = currentState;
    isProcessing = false;
    fubar();
}




// =========================================================================================
// ========= THE TYRANNICAL EFFECT MACHINE =================================================
// =========================================================================================

let effects = [];
let effectIndex = 0;


// ---- React-Like useEffect function ----
export function useEffect(callback, dependencies) {

    let currentEffect = effectIndex++;                           // Grab the currentEffect index and increment effectIndex

    let previousEffect = effects[currentEffect];                 // Grab the value currently stored at the index

    let oldDependencies;                                         // Initialize the oldDependencies

    if (previousEffect !== undefined) {                          // If the current value stored in the index isn't empty,
        oldDependencies = previousEffect.dependencies;           // apply it's current value to oldDependencies.
    }

    let shouldRun = depsChanged(oldDependencies, dependencies);  // Run the helper to compare dependencies (see below)

    effects[currentEffect] = {         // Build the effect object and store at the current index
        callback: callback,            // with the callback function,
        dependencies: dependencies,    // new dependencies,
        shouldRun: shouldRun           // and the boolean that decides whether or not it runs.
    };
}


// ---- DEPENDENCY COMPARISON: Did something change in the dependency array? ----
function depsChanged(oldDeps, newDeps) {

    if (newDeps === undefined || oldDeps === undefined) {     // If the old or new dependencies don't exist,
        return true;                                          // act like it changed.
    }

    if (oldDeps.length !== newDeps.length) {                  // If the arrays aren't the same length,
        return true;                                          // something changed.
    }

    // ASK JOSE: is this correct/safe?
    for (let i = 0; i < newDeps.length; i++) {                // If the values at each index don't match,

        if (oldDeps[i] !== newDeps[i]) {

            return true;                                      // something changed.
        }
    }

    return false;                                             // Apparently, nothing changed.
}

// ---- RUN-EFFECTS: Iterate through effects[]. Check if the stored effects will run or not. ----
function runEffects() {
    effects.forEach(function(effect) {      // Iterate through stored effects.
        if (effect && effect.shouldRun) {   // If they should run...

            effect.shouldRun = false;       // Reset the shouldRun property

            effect.callback();              // and run the callback function.
        }
    });
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
            effectIndex = 0;

            root.appendChild(c());
            
            runEffects();
        }
    };
}


// =========================================================================================


// ---- Rerendering function. It rerenders. Go figure. ----

function fubar() {

    root.replaceChildren();        // Zero-out the page

    stateIndex = 0;                // Reset the state machine
    effectIndex = 0;

    root.appendChild(component()); // Repaint the page

    runEffects();
}