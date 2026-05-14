(function () {
  'use strict';

  const fonts = [
    "Arial",
    "Arial Black",
    "Calibri",
    "Cambria",
    "Candara",
    "Comic Sans MS",
    "Consolas",
    "Courier New",
    "Georgia",
    "Impact",
    "Lucida Console",
    "Segoe UI",
    "Tahoma",
    "Times New Roman",
    "Trebuchet MS",
    "Verdana"
  ];

  const originalCheck = document.fonts.check;

  Object.defineProperty(document.fonts, "check", {
    value: function (font) {

      for (const f of fonts) {
        if (font.includes(f)) {
          return true;
        }
      }

      return originalCheck.apply(this, arguments);
    },
    configurable: true,
    writable: true
  });
})();
