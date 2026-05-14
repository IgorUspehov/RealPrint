(function () {
  'use strict';

  if (!window.RTCPeerConnection) return;

  const OriginalRTCPeerConnection = window.RTCPeerConnection;

  function filterCandidate(candidate) {
    if (!candidate) return candidate;

    const text = String(candidate);

    if (
      text.includes(" typ host ") ||
      text.includes(" typ srflx ") ||
      text.includes("192.168.") ||
      text.includes("10.") ||
      text.includes("172.")
    ) {
      return "";
    }

    return candidate;
  }

  window.RTCPeerConnection = function () {
    const pc = new OriginalRTCPeerConnection(...arguments);

    const originalAddEventListener = pc.addEventListener;

    pc.addEventListener = function (type, listener, options) {
      if (type === "icecandidate" && typeof listener === "function") {
        const wrapped = function (event) {
          if (event && event.candidate) {
            const filtered = filterCandidate(event.candidate.candidate);
            if (!filtered) return;
          }
          return listener.call(this, event);
        };

        return originalAddEventListener.call(this, type, wrapped, options);
      }

      return originalAddEventListener.call(this, type, listener, options);
    };

    Object.defineProperty(pc, "onicecandidate", {
      set: function (handler) {
        if (typeof handler !== "function") return;

        originalAddEventListener.call(pc, "icecandidate", function (event) {
          if (event && event.candidate) {
            const filtered = filterCandidate(event.candidate.candidate);
            if (!filtered) return;
          }
          handler.call(pc, event);
        });
      },
      configurable: true
    });

    return pc;
  };

  window.RTCPeerConnection.prototype = OriginalRTCPeerConnection.prototype;
})();
