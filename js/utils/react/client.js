let root = null;
let component = null;
let isProcessing = false;
let renderCount = 1;

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

    let setterFn = function (val) {             // Async setter, queue up the setter calls
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

        thePromise.then(() => { processQueue(); });
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

let oldDeps = [];


// ---- React-Like useEffect function ----
export function useEffect(cb, deps) {

    let effect = {
        cb,
        deps,
    };


    effects[effectIndex] = effect;
    effectIndex++;
}


function haveDepsChanged(current, previous) {
    let depsAreDifferent = false;

    for (let i = 0; i < current.length; i++) {

        if (current[i] != previous[i]) {

            return true;
        }
    }
}

// ---- RUN-EFFECTS: Iterate through effects[]
function runEffects() {
    effects.forEach(function (effect, index) {      // Iterate through stored effects.
        let cb = effect.cb;
        let deps = effect.deps;
        let shouldExecute = false;
        let previousDeps = oldDeps[index];


        if (renderCount == 1) {
            shouldExecute = true;
        }

        else if (null == deps) {
            shouldExecute = true;
        }

        else if (Array.isArray(deps) && deps.length == 0 && renderCount == 1) {
            shouldExecute = true;
        }

        else if (haveDepsChanged(deps, previousDeps)) {
            shouldExecute = true;
        }


        oldDeps[index] = deps;

        if (shouldExecute) {
            Promise.resolve().then(cb);   // and queue the callback function.
        }

    });

    effects = [];
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
    renderCount++;

    root.appendChild(component()); // Repaint the page

    runEffects();
}