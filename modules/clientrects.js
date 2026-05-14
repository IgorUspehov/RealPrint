(function () {
  'use strict';

  const p = window.RealPrintProfile;
  if (!p) return;

  const seed = p.seed || 777;

  function tinyNoise(value, salt) {
    let n = Math.floor(value * 1000) + seed + salt * 99991;
    n = (n ^ (n >> 13)) * 1274126177;
    const v = ((n ^ (n >> 16)) & 7) - 3;
    return v * 0.001;
  }

  function makeRect(rect, salt) {
    const dx = tinyNoise(rect.x || rect.left || 0, salt + 1);
    const dy = tinyNoise(rect.y || rect.top || 0, salt + 2);
    const dw = tinyNoise(rect.width || 0, salt + 3);
    const dh = tinyNoise(rect.height || 0, salt + 4);

    return {
      x: rect.x + dx,
      y: rect.y + dy,
      width: Math.max(0, rect.width + dw),
      height: Math.max(0, rect.height + dh),
      top: rect.top + dy,
      right: rect.right + dx + dw,
      bottom: rect.bottom + dy + dh,
      left: rect.left + dx,
      toJSON: function () {
        return {
          x: this.x,
          y: this.y,
          width: this.width,
          height: this.height,
          top: this.top,
          right: this.right,
          bottom: this.bottom,
          left: this.left
        };
      }
    };
  }

  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  Object.defineProperty(Element.prototype, "getBoundingClientRect", {
    value: function () {
      const rect = originalGetBoundingClientRect.apply(this, arguments);
      return makeRect(rect, 100);
    },
    configurable: true,
    writable: true
  });
})();
