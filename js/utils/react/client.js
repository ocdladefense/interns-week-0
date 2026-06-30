let root = null;
let component = null;

// ========= THE AMAZING STATE MACHINE =======================
let state = {};
let renderCount = 0;

export function useState(initialValue, key) {
    
    if (renderCount == 0) {
        state[key] = initialValue;
    }

    let currentValue = state[key];
 
    function setState(newValue) {
        state[key] = newValue;
        fubar();
    }

    return [currentValue, setState];
}

export function createRoot(node) {
    root = node;
    return {
        render: function (c) {
            component = c;
            root.replaceChildren();
            root.appendChild(c());
        }
    };
}

function fubar() {
    root.replaceChildren();
    root.appendChild(component());
    renderCount++;
}