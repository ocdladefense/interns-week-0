let root = null;
let activeLocationId = null;
let component = null;

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

export function getActiveLocationId() {
    return activeLocationId;
}

export function setActiveLocationId(activeLocationIdTmp) {
    activeLocationId = activeLocationIdTmp;
    fubar(); // Need to rerender here
}

function fubar() {
    root.replaceChildren();
    root.appendChild(component());
}