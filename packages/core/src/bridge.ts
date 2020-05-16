// TODO implement a console/logging process that also logs natively?

import { Subject, Observable } from 'rxjs';
// import PentodeError from 'PentodeError';

/**
 * Add pentode to the Window instance
 */
interface Window {
  WEBVIEW_SERVER_URL: string;
  pentode: Pentode;
}

// keep a collection of callbacks for native response data
const calls: Map<CallId, Subject<any>> = new Map();

let nextCallId = Math.floor(Math.random() * 134217728);

export default class PentodeCommon {

  public Plugins = new Map<string, PentodePlugin>();

  // TODO what is this for?
  public static convertFileSrc(url?: string): string | undefined {
    if (!url) {
      return url;
    }

    // FIXME can't this be handled in the native? seems like overkill?
    if (url.startsWith('/')) {
      return `${window.WEBVIEW_SERVER_URL}/_pentode_file_${url}`;
    }
    if (url.startsWith('file://')) {
      return window.WEBVIEW_SERVER_URL + url.replace('file://', '/_pentode_file_');
    }
    if (url.startsWith('content://')) {
      return window.WEBVIEW_SERVER_URL + url.replace('content:/', '/_pentode_content_');
    }
    return url;
  }

  // FIXME this should probably take a PentodeNativeRequest, and build the request elsewhere
  // TODO what exactly is `post()` doing?
  public static toNative<T = null>(pluginId: string, methodName: string, data: T, save = false): Observable<T> {
    const res = new Subject<T>();

    // eslint-disable-next-line no-plusplus
    const callId = ++nextCallId;
    calls.set(callId, res);

    const call: PentodeNativeRequest<T> = { pluginId, methodName, callId, data, save };
    this.post(call);
    return res.asObservable();
  }

  public static fromNative(result: PentodeNativeResponse) {
    const out = calls.get(result.callId);
    if (!out) {
      console.log(`we do not have that call on record: (${result.callId})`, result);
      return;
    }

    if (result.error) {
      out.error(new PentodeError(result.error));
    }

    if (result.data) {
      out.next(result.data);
    }

    if (!result.save) {
      out.complete();
      calls.delete(result.callId);
    }
  }
}
