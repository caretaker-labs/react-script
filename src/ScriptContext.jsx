// @flow

import React, { type Node } from 'react';

const { Provider, Consumer } = React.createContext();

type Script = {|
  onLoad?: string,
  onCreate?: string,
  onError?: string,
  url: string,
|};

export const ScriptProvider = (props: {|
  injectScript: (Script) => *,
  children: Node,
|}) => (
  <Provider value={props.injectScript}>
    {props.children}
  </Provider>
);

export const ScriptConsumer = (props: {|
  children: React$Element<*>,
|}) => (
  <Consumer>
    {value => React.cloneElement(props.children, { injectScript: value })}
  </Consumer>
);
