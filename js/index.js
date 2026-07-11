import { App } from './components/App.js';
import { createRoot } from 'react';

// --------------------------------------------------------------------------------------------------------------------
// RENDERING THE PAGE
// --------------------------------------------------------------------------------------------------------------------

let root = createRoot(document.getElementById('app'));

root.render(App);
