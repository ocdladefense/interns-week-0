// Class declaration for History object with the property: history[], and  the methods: add() to .push to the array, and getHistory() to return a .slice copy of the array.
export class History {
    history;

    // Full Constructor
    constructor() {
        this.history = [];
    }

    // Add function
    add(cityId) {                       // Pass location.name
        this.history.push(cityId);      // Push to the history[] array
    }

    // Get copy of current array
    getHistory() {
        return this.history.slice();      // Return a copy of the current history[] array
    }

    listenForLocationChanges(eventTarget) {                             // Listener for Synthetic Event 'locationChange' from eventTarget
        eventTarget.addEventListener('locationChange', (event) => {
            const cityId = event.detail.id;                         // Accesses the name dtail of the event and stores in a constant

            this.add(cityId);                                         // Pushes the constant's value (name detail from event) to the History object

            console.log(this.getHistory());                             // Logs the updated array
        });
    }
}