(function () {
  'use strict';

  const p = window.RealPrintProfile;
  if (!p || !p.permissions) return;

  const originalQuery = navigator.permissions.query;

  navigator.permissions.query = function (params) {

    if (params && params.name) {

      const value = p.permissions[params.name];

      if (value) {
        return Promise.resolve({
          state: value
        });
      }
    }

    return originalQuery.apply(this, arguments);
  };
})();
