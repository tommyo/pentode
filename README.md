# pentode

[Capacitor](https://capacitor.ionicframework.com/) is a fantastic framework for generating cross-device hybrid apps quickly and easily. It is a great step in the right direction from Cordova/PhoneGap, which feels dated. So why, then, another library?

## Cordova was a great start

## Ionic made it easier

## What Capacitor got right

## What Capacitor got wrong

## What does pentode do differently?

### We're not really an App, we're a...

Cordova and Capacitor both assume you're building a complete app using their toolkit. A WebView, however, is just a component, widget, piece of the pie, whatever. You want to build an app that is 100% WebView? Cool! We'll show you how. But otherwise, why force the issue? Put us where you want.

### Our Javascript parts are Written in Typescript, transpiled to everything else.

Typescript makes the codebase cleaner, easier to enforce good practices, easier to... well, you get the point.

### Few plugins active by default

All plugins should be explicitely loaded, maybe with the exception of Console.

### No native support for other platform plugins

However we may build `CordovaWrapper` and `CapacitorWrapper` plugins to allow their plugins to work within our framework. This is not really a priority.

### Always return an Observable.

Rather than deal with supporting synchronous and multiple responses with a callback, and one-and-done asynchronous with Promises, we use RxJS Observables, which support the best of both worlds, with the added benefit of being lazy. We'll show you how best to handle these.
```es6
// often you'll want to wait on something async.
const asPromised = await MyPlugin.doSomethingPromising().toPromise();

// sometimes you'll do something repeatedly
MyPlugin.doSomethingOverAndOver().forEach(console.log).then(() => console.log('done'));

// or you can make a lazy call
const lazyCall = MyPlugin.doSomethingLater();
setTimeout(() => {
  lazyCall.subscribe(console.log);
}, 1000);
```

### Did someone say Observables?

We're looking into exposing two-way Observable patterns across the bridge. What are the performance implications? What are the use cases? Is it even worth considering? We think so!

### Each platform project should be its own thing.

Each platform should have its own build logic, importing common libraries where needed, rather than a centralized place where platforms are added. If you like the centralized aspect then arrange in a monorepo and use tools specialized for that behavior, like [lerna](http://lerna.js.org). We'll show you how.

### Tools and education, no hammer.

Although we may supply some templates and drop-ins, our plan is to give you the tools to do it yourself. Our templates will use those same tools. We'll also give you as much documentation as we can to help you get to where, how and why we do things the way we do. It's easier (and better) to tell you how and why than to force you to do it our way. We're all programmers in the long run.

### Earlier registration of Plugins

Capacitor registers the plugins after the WebView is esablished. This doesn't allow Plugins to do things like register with the WebView configuration, and may even result in slower startup time. Instead, Plugins will be instantiated, and then be asked to register with the webview once it is up and ready. How this is done is TBD.

## Platform support

As you can see we're pretty ambitious about being truly cross-platform. (Although priority sits with web/ios/android.)

 - [ ] web/pwa
 - [ ] android
 - [ ] ios
 - [ ] electron
 - [ ] NativeScript
 - [ ] React Native
 - [ ] MacOS
 - [ ] Windows
 - [ ] Qt
 - [ ] gomobile
 - [ ] [WebAssembly](https://pspdfkit.com/blog/2018/running-native-code-in-electron-and-the-case-for-webassembly/)
 - [ ] [Universal Windows Platform](https://docs.microsoft.com/en-us/windows/uwp/)
 - [ ] [Catalyst](https://9to5mac.com/guides/project-catalyst/)

## What's in a name?

Since this is inspired by Capacitor, I thought it would be good to find something similar. The [Namelix](https://namelix.com/app/?keywords=capacitor) tool gave some great suggestions, and `pentode` caught my eye. [Here's a good distraction for you.](https://en.wikipedia.org/wiki/Pentode)

