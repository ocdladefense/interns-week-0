// 'Button' Element Function
export function Button(label, id, isActive, onClick) {         // Passes the Location object, active location, and onClick handler to the function
    const button = document.createElement('button');       // Creates a <button> element in memory
    const text = document.createTextNode(label);           // Creates a text node  in memory using the name value of the object

    button.appendChild(text);                              // Append the text node inside the <button> node

    if (isActive) {
        button.classList.add('active-button');             // Adds active-button to the button's class list for styling
    }

    button.addEventListener('click', function () {        // Adds an event listener for a user click to the <button>
        onClick(id);                                      // Calls the onClick function for the buttons
    });

    return button;                                        // Return the completed button
}