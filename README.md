# vue-rudderstack

Vue 3 plugin for [Rudderstack](https://github.com/rudderlabs)

## Requirements

vue ^3.0.0

## Installation

```bash
npm install --save-dev vue-rudderstack
```

- main.js

```js
import { rudderstack } from "vue-rudderstack";

const app = createApp(App).use(rudderstack, {
  writeKey: WRITE_KEY,
  dataPlaneUrl: DATA_PLANE_URL,
});
```

- Anywhere in your app:

```js
window.rudderanalytics.page("test page");
window.rudderanalytics.track("test track");
```
