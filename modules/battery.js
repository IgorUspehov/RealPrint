(function () {
  'use strict';

  const battery = {
    charging: true,
    chargingTime: 0,
    dischargingTime: Infinity,
    level: 0.93,

    addEventListener: function () {},
    removeEventListener: function () {},
    dispatchEvent: function () {
      return true;
    },

    onchargingchange: null,
    onchargingtimechange: null,
    ondischargingtimechange: null,
    onlevelchange: null
  };

  Object.defineProperty(Navigator.prototype, "getBattery", {
    value: async function () {
      return battery;
    },
    configurable: true
  });
})();
