import { Button } from './Button.js';

export function StatePicker(stateCodes, activeStateCode, onClick) {
    const container = document.createElement('div');                                  // Creates a <div> element in memory
    const heading = document.createElement('h2');
    const headingText = document.createTextNode('Choose a State:')

    heading.appendChild(headingText);
    container.appendChild(heading);



    stateCodes.forEach(function (stateCode) {
        const isActive = stateCode === activeStateCode;
        const button = Button(stateCode, stateCode, isActive, onClick);
        container.appendChild(button);
    });

    return container;  // Return the <div> node with all the <button> nodes appended
}