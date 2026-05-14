(function () {
  'use strict';

  const p = window.RealPrintProfile;
  if (!p) return;

  function set(obj, key, value) {
    Object.defineProperty(obj, key, {
      get: function () {
        return Array.isArray(value) ? value.slice() : value;
      },
      configurable: true
    });
  }

  set(Navigator.prototype, "userAgent", p.userAgent);
  set(Navigator.prototype, "platform", p.platform);
  set(Navigator.prototype, "languages", p.languages);
  set(Navigator.prototype, "language", p.languages[0]);

  set(Navigator.prototype, "hardwareConcurrency", p.hardware.hardwareConcurrency);
  set(Navigator.prototype, "deviceMemory", p.hardware.deviceMemory);
  set(Navigator.prototype, "maxTouchPoints", p.hardware.maxTouchPoints);
  set(Navigator.prototype, "webdriver", undefined);

  set(Screen.prototype, "width", p.screen.width);
  set(Screen.prototype, "height", p.screen.height);
  set(Screen.prototype, "availWidth", p.screen.availWidth);
  set(Screen.prototype, "availHeight", p.screen.availHeight);
  set(Screen.prototype, "colorDepth", p.screen.colorDepth);
  set(Screen.prototype, "pixelDepth", p.screen.pixelDepth);

  set(window, "devicePixelRatio", p.screen.devicePixelRatio);
})();
