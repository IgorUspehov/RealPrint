(function () {
  'use strict';

  const p = window.RealPrintProfile;
  if (!p) return;

  const plugins = [
    {
      name: "PDF Viewer",
      filename: "internal-pdf-viewer",
      description: "Portable Document Format"
    },
    {
      name: "Chrome PDF Viewer",
      filename: "internal-pdf-viewer",
      description: "Portable Document Format"
    },
    {
      name: "Chromium PDF Viewer",
      filename: "internal-pdf-viewer",
      description: "Portable Document Format"
    },
    {
      name: "Microsoft Edge PDF Viewer",
      filename: "internal-pdf-viewer",
      description: "Portable Document Format"
    },
    {
      name: "WebKit built-in PDF",
      filename: "internal-pdf-viewer",
      description: "Portable Document Format"
    }
  ];

  const mimeTypes = [
    {
      type: "application/pdf",
      suffixes: "pdf",
      description: "Portable Document Format"
    },
    {
      type: "text/pdf",
      suffixes: "pdf",
      description: "Portable Document Format"
    }
  ];

  function makeArray(items) {
    const arr = items.slice();

    arr.item = function (index) {
      return this[index] || null;
    };

    arr.namedItem = function (name) {
      return this.find(function (item) {
        return item.name === name || item.type === name;
      }) || null;
    };

    Object.defineProperty(arr, "length", {
      get: function () {
        return items.length;
      }
    });

    return arr;
  }

  Object.defineProperty(Navigator.prototype, "plugins", {
    get: function () {
      return makeArray(plugins);
    },
    configurable: true
  });

  Object.defineProperty(Navigator.prototype, "mimeTypes", {
    get: function () {
      return makeArray(mimeTypes);
    },
    configurable: true
  });
})();
