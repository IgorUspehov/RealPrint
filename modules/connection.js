(function () {
  'use strict';

  const connection = {
    effectiveType: "4g",
    downlink: 10,
    rtt: 50,
    saveData: false,
    type: "wifi",
    onchange: null,
    addEventListener: function () {},
    removeEventListener: function () {},
    dispatchEvent: function () {
      return true;
    }
  };

  Object.defineProperty(Navigator.prototype, "connection", {
    get: function () {
      return connection;
    },
    configurable: true
  });
})();
