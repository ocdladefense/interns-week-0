import { App } from './components/App.js';
import { createRoot } from './utils/react/client.js';

// --------------------------------------------------------------------------------------------------------------------
// RENDERING THE PAGE
// --------------------------------------------------------------------------------------------------------------------

// const app = App(locations, activeLocation, setActiveLocationId);   // Pass the App() function and store the container in appRoot constant
let root = createRoot(document.getElementById('app'));

root.render(App);
