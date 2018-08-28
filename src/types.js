// @flow

export type InjectedScript = {|
  onLoad?: string,
  onCreate?: string,
  onError?: string,
  url: string,
|};
