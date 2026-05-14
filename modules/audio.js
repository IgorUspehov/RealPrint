(function () {
  'use strict';

  const p = window.RealPrintProfile;
  if (!p) return;

  const seed = p.seed || 777;

  function noise(index) {
    let n = index * 1103515245 + seed * 12345;
    n = (n ^ (n >> 16)) >>> 0;
    return ((n % 1000) / 1000 - 0.5) * 0.0000001;
  }

  const originalGetChannelData = AudioBuffer.prototype.getChannelData;

  Object.defineProperty(AudioBuffer.prototype, "getChannelData", {
    value: function (channel) {
      const data = originalGetChannelData.apply(this, arguments);

      try {
        for (let i = 0; i < data.length; i += 100) {
          data[i] = data[i] + noise(i + channel);
        }
      } catch (e) {}

      return data;
    },
    configurable: true,
    writable: true
  });
})();
