export function NoLocationSelected() {
        const container = document.createElement('section');
        const noLocation = document.createElement('h2');                     // Create an <h2> node in memory
        const noLocationText = document.createTextNode('No City Selected!'); // Create a text node

        noLocation.appendChild(noLocationText);              // Append text node to <h2> node
        container.appendChild(noLocation);                   // Append <h2> node to <section> node

        return container;
}