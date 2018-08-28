// @flow

import React, { PureComponent } from 'react';

import { ScriptConsumer } from './ScriptContext';

import type { InjectedScript } from './types';

type ScriptEvent = () => * | {| react?: () => *, preReact?: string |};

type Props = {|
  async: boolean,
  injectScript: (InjectedScript) => *,
  onCreate: ScriptEvent,
  onError: ScriptEvent,
  onLoad: ScriptEvent,
  url: string,
|};

class Script extends PureComponent<Props> {
  scriptLoaderId: string;

  static defaultProps = {
    async: true,
    onCreate: () => {},
    onError: () => {},
    onLoad: () => {},
  };

  static erroredScripts = {};
  static idCount = 0;
  static readyScripts = {};
  static loadingScripts = {};

  constructor(props: Props) {
    super(props);

    this.scriptLoaderId = `id${this.constructor.idCount += 1}`;
  }

  componentWillMount() {
    if (this.props.injectScript) {
      const script: InjectedScript = { url: this.props.url };

      if (this.props.onError.preReact) script.onError = this.props.onError.preReact;
      if (this.props.onCreate.preReact) script.onCreate = this.props.onCreate.preReact;
      if (this.props.onLoad.preReact) script.onLoad = this.props.onLoad.preReact;

      this.props.injectScript(script);
    }
  }

  componentDidMount() {
    if (this.constructor.erroredScripts[this.props.url]) {
      this.handleError();
      return;
    }

    if (this.constructor.readyScripts[this.props.url]) {
      this.handleLoad();
      return;
    }

    if (this.constructor.loadingScripts[this.props.url]) {
      this.constructor.loadingScripts[this.props.url][this.scriptLoaderId] = {
        onLoad: this.handleLoad.bind(this),
        onError: this.handleError.bind(this),
      };
      return;
    }

    // If script is in the DOM but not in cache, it was probably loaded from the server
    if (document.querySelector(`script[src="${this.props.url}"]`)) {
      this.constructor.readyScripts[this.props.url] = true;
      this.handleLoad();
      return;
    }

    this.constructor.loadingScripts[this.props.url] = {
      [this.scriptLoaderId]: {
        onLoad: this.handleLoad.bind(this),
        onError: this.handleError.bind(this),
      },
    };

    this.createScript();
  }

  componentWillUnmount() {
    const loadingScripts = this.constructor.loadingScripts[this.props.url];

    if (loadingScripts) delete loadingScripts[this.scriptLoaderId];
  }

  handleCreate() {
    if (typeof this.props.onCreate === 'function') {
      this.props.onCreate();
    } else if (this.props.onCreate.react) {
      this.props.onCreate.react();
    }
  }

  handleError() {
    if (typeof this.props.onError === 'function') {
      this.props.onError();
    } else if (this.props.onError.react) {
      this.props.onError.react();
    }
  }

  handleLoad() {
    if (typeof this.props.onLoad === 'function') {
      this.props.onLoad();
    } else if (this.props.onLoad.react) {
      this.props.onLoad.react();
    }
  }

  render() {
    return null;
  }

  createScript() {
    const script = document.createElement('script');

    this.handleCreate();

    script.type = 'text/javascript';
    script.src = this.props.url;
    script.async = this.props.async;

    script.onload = () => {
      this.constructor.readyScripts[this.props.url] = true;
      const loadingScripts = this.constructor.loadingScripts[this.props.url];

      Object.keys(loadingScripts).forEach((key) => {
        loadingScripts[key].onLoad();
        delete loadingScripts[key];
      });
    };

    script.onerror = () => {
      this.constructor.erroredScripts[this.props.url] = true;
      const loadingScripts = this.constructor.loadingScripts[this.props.url];

      Object.keys(loadingScripts).forEach((key) => {
        loadingScripts[key].onError();
        delete loadingScripts[key];
      });
    };

    if (document.body) document.body.appendChild(script);
  }
}

const ScriptWithConsumer = (props: Props) => (
  <ScriptConsumer>
    <Script {...props} />
  </ScriptConsumer>
);

export default ScriptWithConsumer;
