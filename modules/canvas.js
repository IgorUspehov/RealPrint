(function () {
  'use strict';

  const p = window.RealPrintProfile;
  if (!p) return;

  const seed = p.seed || 777;

  function noise(x, y, c) {
    let n = x * 374761393 + y * 668265263 + c * 1442695041 + seed;
    n = (n ^ (n >> 13)) * 1274126177;
    return ((n ^ (n >> 16)) & 1) ? 1 : -1;
  }

  function patchImageData(imageData) {
    const data = imageData.data;
    const width = imageData.width;

    for (let i = 0; i < data.length; i += 16) {
      const pixel = i / 4;
      const x = pixel % width;
      const y = Math.floor(pixel / width);

      data[i] = Math.max(0, Math.min(255, data[i] + noise(x, y, 0)));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise(x, y, 1)));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise(x, y, 2)));
    }

    return imageData;
  }

  const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;

  Object.defineProperty(CanvasRenderingContext2D.prototype, "getImageData", {
    value: function () {
      const imageData = originalGetImageData.apply(this, arguments);
      return patchImageData(imageData);
    },
    configurable: true,
    writable: true
  });

  const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;

  Object.defineProperty(HTMLCanvasElement.prototype, "toDataURL", {
    value: function () {
      try {
        const ctx = this.getContext("2d");

        if (!ctx || !this.width || !this.height) {
          return originalToDataURL.apply(this, arguments);
        }

        const imageData = ctx.getImageData(0, 0, this.width, this.height);

        const clone = document.createElement("canvas");
        clone.width = this.width;
        clone.height = this.height;

        clone.getContext("2d").putImageData(imageData, 0, 0);

        return originalToDataURL.apply(clone, arguments);
      } catch (e) {
        return originalToDataURL.apply(this, arguments);
      }
    },
    configurable: true,
    writable: true
  });
})();
