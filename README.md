# dv-project
[![Build status][travis-badge]][travis-url] ![Size][size-badge] [![Version][tag-badge]][releases-url] [![Published][webcomponents-badge]][webcomponents-url]

Assignment Project

## Installation & usage

Install dv-project with Bower

```sh
$ bower i /dv-project --save
```

Import it into the `<head>` of your page

```html
<link rel="import" href="/bower_components/dv-project/dv-project.html">
```

Then use dv-project in your project

```html
<dv-project></dv-project>
```

### Polyfills for cross-browser support

dv-project relies on emerging standards, for full cross-browser support include the [WebComponentsJS](https://github.com/webcomponents/webcomponentsjs) polyfill on your page.

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@^1.0.0/webcomponents-loader.js"></script>
```

### Transpiling for IE11 support

Web Components like dv-project are distributed as ES6 classes, which are supported in all evergreen browsers. To support Internet Explorer 11 you should transpile dv-project to ES5 and use the `webcomponentsjs` `custom-elements-es5-adapter.js` shim. 

The easiest way to do this is by including [polymer-build][polymer-build] in your buildstep of choice. Then just include the ES5 adapter on your page

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@^1.0.0/custom-elements-es5-adapter.js"></script>
```

***

MIT © Sourav Mondal

[tag-badge]: https://img.shields.io/github/tag//dv-project.svg
[releases-url]: https://github.com//dv-project/releases
[travis-badge]: https://img.shields.io/travis//dv-project.svg
[travis-url]: https://travis-ci.org//dv-project
[size-badge]: http://img.badgesize.io//dv-project/master/props.name .html?compression=gzip&label=size%20%28unminified%29
[webcomponents-badge]: https://img.shields.io/badge/webcomponents.org-published-blue.svg
[webcomponents-url]: https://www.webcomponents.org/element//dv-project
[polymer-build]: https://github.com/Polymer/polymer-build
