# React Script

![npm Version](https://img.shields.io/badge/npm-v1.0.0-blue.svg)
![Real Download Count (Very Real)](https://img.shields.io/badge/proud%20dads-none%20i%20am%20a%20disappointment-red.svg?longCache=true&style=flat)
![Very Real Test Coverage](https://img.shields.io/badge/github%20stars-700MM-brightgreen.svg)

React Mapbox is a dead simple, performant, and easy to use React library for Mapbox. Other libraries either aim to cover the entire mapbox-gl-js API, or provide specific functionality for unique use cases.

We aim to give you a dead simple set of basic map components to work with, and if you end up needing more advanced functionality you can fork it and [make your own](https://blog.mapbox.com/mapbox-gl-js-react-764da6cc074a).

React Mapbox and it's one dependency [React Script](https://github.com/flip-inc/react-script) only rely on React, so the library is extremely lightweight. The Mapbox library itself is dynamically injected when needed, so this package won't affect bundle size on views that don't need maps.

## Example
```javascript
import React, { PureComponent } from 'react';
import Mapbox, { Marker, ZoomControl } from 'react-mapbox';

class MapView extends PureComponent {
  this.state = {
    viewport: {
      center: {
        lat: 37.7577,
        lng: -122.4376,
      },
      zoom: 10,
    },
  };

  render () {
    return (
      <div className="map">
        <Mapbox
          mapbox={{
            accessToken: 'your-access-token',
            style: 'mapbox://styles/your-map-style',
          }}
          viewport={this.state.viewport}>
          <ZoomControl />
          <Marker
            lat={37.7577}
            lng={-122.4376}>
            <div className="marker">
              You are here!
            </div>
          </Marker>
        </Mapbox>
      </div>
    );
  }
};
```

React Mapbox supports several useful callbacks: `onClick`, `onError`, `onLoad`, `onMoveEnd`, `onTouchEnd`

`onTouchEnd` and `onMoveEnd` pass the new map position details as a parameter:
```
    {
      bearing: map.getBearing(),
      bounds: {
        northeast: {
          lat: bounds.getNorth(),
          lng: bounds.getEast(),
        },
        southwest: {
          lat: bounds.getSouth(),
          lng: bounds.getWest(),
        },
      },
      center: {
        lat: center.lat(),
        lng: center.lng(),
      },
      pitch: map.getPitch(),
      zoom: map.getZoom(),
    }
```

`onLoad` fires when the map is fully loaded. It's hooked into the `load` event within mapbox-gl-js, which means the style has loaded and the map has rendered for the first time.


## Compatibility

React Mapbox exclusively works with React 16+ because it relies on the new Context API in React 16.

## Installation

Yarn:
```bash
yarn add react-mapbox
```

npm:
```bash
npm install --save react-mapbox
```

## Server Usage

React Script is handling the script loading, so you can setup a ScriptProvider and render your scripts from the server.

```javascript
import React from 'react';
import { ScriptProvider } from 'react-script';

const scripts = [];
const markup = React.renderToString(
  <ScriptProvider injectScript={(script) => scripts.push(script)}>
    ...
  </ScriptProvider>
);

res.render('app', {
  markup,
  scripts,
});
```

You can view `react-script` documentation [here](https://github.com/flip-inc/react-script).

## Contributing to this project
We have no contibution guide, it's just anarchy live your life

## License
MIT
