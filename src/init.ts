import loadScript from "load-script";

type Rudderanalytics = {
  [key: string]: any;
};
declare global {
  interface Window {
    rudderanalytics: any;
  }
}

export default function init(config, callback) {
  if (!config || !config.writeKey || !config.dataPlaneUrl) {
    console.warn("Please enter a rudderstack write key and data plane url");
    return;
  }
  const rudderanalytics: Rudderanalytics = (window.rudderanalytics = []);
  var methods = [
    "load",
    "page",
    "track",
    "identify",
    "alias",
    "group",
    "ready",
    "reset",
    "getAnonymousId",
    "setAnonymousId",
    "getUserId",
    "getUserTraits",
    "getGroupId",
    "getGroupTraits",
    "startSession",
    "endSession",
    "getSessionId",
  ];
  for (var i = 0; i < methods.length; i++) {
    var method = methods[i];
    rudderanalytics[method] = (function (methodName) {
      return function () {
        rudderanalytics.push(
          [methodName].concat(Array.prototype.slice.call(arguments))
        );
      };
    })(method);
  }

  rudderanalytics.load(config.writeKey, config.dataPlaneUrl);
  rudderanalytics.page();

  const source = `https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js`;
  loadScript(source, function (error, script) {
    if (error) {
      console.warn("Oops! It is not possible to load Rudderstack script");
      return;
    }
    const poll = setInterval(function () {
      if (!window.rudderanalytics) {
        return;
      }
      clearInterval(poll);
      if (callback && typeof callback === "function") {
        callback();
      }
    }, 10);
  });
  return window.rudderanalytics;
}
