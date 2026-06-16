# interns-week-0
Sandbox to build week 0 apps.

Exercise #0 - Latitude / Longitude

### Summary
Create a simple app that displays information about a given U.S. city; specifically, its latitude and longitude.

### Basics
Create an array of Locations corresponding to 10 major U.S. cities.  Create a corresponding UI that displays information about the Location.  Create an html page and one or more javascript files.  Part of the challenge is keeping your code organized, in part by recognizing separation of concerns through basic MVC.

Given: An object can represent a geographical location.
Given: A location object will have at least two properties: lat, lng, both integers, representing a point [x,y] (i.e., [lng,lat]).

```javascript
class Location {
  lng;
  lat;

  construct(lat, lng) {
    ...
  }
}
```

Each city should be assigned a variable representing the name of the city.  For each city, create a button corresponding to the name of the city.  Use <code>document.createElement()</code>, <code>document.createTextNode()</code> and <code>document.appendChild()</code> to create the buttons (See "Rendering", below.)  Do not use JavaScript template literals (i.e., using backticks).  Do not use innerHTML.

### Events and event handling
The buttons can be interacted with.  A user can click a button.  When a button is clicked, the name of the city together with the latitude and longitude should be displayed.  Use Node.addEventListener().

Keep track of which buttons have been clicked, even when buttons have been clicked multiple times.  Create a History object that keeps track of the names and order in which buttons have been clicked.

Active button
A clicked button becomes the active button; that is, it is the currently-selected button.  Only one button is active at a time.  An active button's state should be represented visually.

### Rendering
Do not use React.  Each component for the view is a single JavaScript function.  Function names must be capitalized.  Each function returns a single node tree wrapped in a top-level DOM Node (i.e., div --> ul --> [li/, li/, li/] --> /ul --> /div).  Rendering can be done with either/both of <code>appendChild()</code> or <code>replaceChild()</code> (or equivalent methods).

### Goals
We're looking to see how well you can break this problem down into its constituent parts and organize your code around those parts.  This will typically mean separate files for data, controllers and components.  You're encouraged to componentize the view into a logical structure based on the function of each component and finally re-render your root component when a different button is clicked.  We will also continue this exercise into week #1 to build rudimentary rendering and state engines.

### Research
Use [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript) as a reference for DOM methods.
