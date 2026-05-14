(function () {
  'use strict';

  const p = window.RealPrintProfile;
  if (!p || !p.timezone) return;

  const timezone = p.timezone;
  const offset = -60;

  const originalResolvedOptions = Intl.DateTimeFormat.prototype.resolvedOptions;

  Object.defineProperty(Intl.DateTimeFormat.prototype, "resolvedOptions", {
    value: function () {
      const options = originalResolvedOptions.apply(this, arguments);
      options.timeZone = timezone;
      return options;
    },
    configurable: true,
    writable: true
  });

  Object.defineProperty(Date.prototype, "getTimezoneOffset", {
    value: function () {
      return offset;
    },
    configurable: true,
    writable: true
  });
})();
