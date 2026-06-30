import { App } from './components/App.js';
import { createRoot } from './utils/react/client.js';

// --------------------------------------------------------------------------------------------------------------------
// RENDERING THE PAGE
// --------------------------------------------------------------------------------------------------------------------

let root = createRoot(document.getElementById('app'));

root.render(App);
