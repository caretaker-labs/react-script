# React Script

![npm Version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)
![Real Download Count (Very Real)](https://img.shields.io/badge/proud%20dads-none%20I%20am%20a%20disappointment-red.svg?longCache=true&style=flat)
![Very Real Test Coverage](https://img.shields.io/badge/github%20stars-more%20than%20dan%20abramov-brightgreen.svg)

React Script is a simple way to dynamically load external scripts on both the client and server side for both convenience and performance. This library provides two components, `Script` and `ScriptProvider`.

It's simple to get a script loading, but you can easily dig into more advanced functionality if you need it.

## Example
```javascript
import React, { Component } from 'react';
import Script from 'react-script';

class Mapbox extends Component {
  handleLoad = () => {
    // Mapbox is ready!
  };

  render() {
    return (
      <Script
        url="https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.js"
        onLoad={this.handleLoad}
      />
    )
  }
}
```

React Script also has callbacks for `onError` and `onCreate`. `onCreate` fires when the script is initially injected, so if another component injected the script or it was previously loaded, this callback won't fire.


## Compatibility

React Script exclusively works with React 16+ because it relies on the new Context API in React 16.

## Installation

Yarn:
```bash
yarn add react-script
```

npm:
```bash
npm install --save react-script
```

## Server Usage

ScriptProvider takes an `injectScript` function, and calls it with whatever scripts are rendered in your app. The scripts passed to that function take this form:
```javascript
{
  onLoad?: string,
  onCreate?: string,
  onError?: string,
  url: string,
}
```

The callback functions are strings because they only apply to functions that you specifically pass to be fired independently of React. When server rendering, you can use this to initialize things ahead of React. For example, we use it to start initializing Mapbox as soon as possible instead of having to wait for our React app to load first. Here's how you can do that:

```javascript
import React, { Component, Fragment } from 'react';
import Script from 'react-script';

class Mapbox extends Component {
  componentDidMount() {
    // window.mapboxInstance is already ready!
  }

  handleLoad = () => {
    // This fires on the initial Script render because mapbox-gl-js is already loaded
  };

  render() {
    return (
      <Fragment>
        <Script
          url="https://api.tiles.mapbox.com/mapbox-gl-js/v0.48.0/mapbox-gl.js"
          onLoad={{
            react: this.handleLoad,
            preReact: 'window.mapboxInstance = window.mapboxgl({ container: "mapbox-gl" })',
          }}
        />
        <div id="mapbox-gl" />
      </Fragment>
    )
  }
}
```

And here's how you would handle that on the server:

```javascript
import React from 'react';
import { ScriptProvider } from 'react-script';

const scripts = [];
const markup = React.renderToString(
  <ScriptProvider injectScript={(script) => scripts.push(script)}>
    ...
  </ScriptProvider>
);

res.send('
  <html>
    <head />
    <body>
      ${scripts.map(script => (
        '<script src="${script.url}" onload="${script.onLoad}" type="text/javascript" />
      ))}
    </body>
  </html>
')
```

## Contributing to this project
We have no contibution guide, it's just anarchy live your life

## License
MIT
