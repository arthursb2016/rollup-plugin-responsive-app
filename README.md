# rollup-plugin-responsive-app [beta]
A Rollup plugin to automatically handle your app responsiveness:

* Set up and ready
* Web accessible compliant
* Mobile screen auto-adaptation [experimental]

## Install

```javascript
npm i -D rollup-plugin-responsive-app
```

## Usage

In your `rollup.config.js` or `vite.config.js` file:

```javascript
import responsive from 'rollup-plugin-responsive-app'

export default {
  ...
  plugins: [
    ...,
    // Last plugin on the list
    responsive()
  ],
};
```

## Options
Check the [responsive-app](https://www.npmjs.com/package/responsive-app?activeTab=readme) docs page
