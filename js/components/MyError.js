export function MyError(message) {
    const container = document.createElement('section');           // creat a <section> container
    const noLocation = document.createElement('h2');               // Create an <h2> node in memory
    const noLocationText = document.createTextNode(message);       // Create a text node

    noLocation.appendChild(noLocationText);
    container.appendChild(noLocation);

return container;
}