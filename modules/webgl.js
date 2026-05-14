(function () {
  'use strict';

  const p = window.RealPrintProfile;
  if (!p || !p.webgl) return;

  const VENDOR = 37445;
  const RENDERER = 37446;

  function patch(proto) {
    if (!proto || !proto.getParameter) return;

    const original = proto.getParameter;

    Object.defineProperty(proto, "getParameter", {
      value: function (param) {
        if (param === VENDOR) {
          return p.webgl.vendor;
        }

        if (param === RENDERER) {
          return p.webgl.renderer;
        }

        return original.apply(this, arguments);
      },
      configurable: true,
      writable: true
    });
  }

  patch(WebGLRenderingContext.prototype);

  if (window.WebGL2RenderingContext) {
    patch(WebGL2RenderingContext.prototype);
  }
})();
