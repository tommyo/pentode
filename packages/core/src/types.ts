// import PentodeError from '@pentode/core';

interface PentodePlatform {
  readonly isNative: boolean;
  readonly platform: string;
}

interface PentodeInteraction {
  post(data: any): void;
}

interface Pentode extends PentodePlatform, PentodeInteraction {
  readonly WEBVIEW_SERVER_URL: string;
  DEBUG?: boolean;
  Plugins: Map<string, PentodePlugin>;
}

type CallId = number;

interface PentodeNativeRequest<T = void> {
  readonly pluginId: string;
  readonly methodName: string;
  readonly callId: CallId;
  readonly save: boolean;
  readonly data: T;
}

interface PentodeNativeResponse<T = void> {
  readonly pluginId: string;
  readonly methodName: string;
  readonly callId: CallId;
  readonly save: boolean;
  readonly data?: T;
  readonly error?: any;
}

interface PentodePlugin {

}
