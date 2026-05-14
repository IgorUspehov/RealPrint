(function () {
  'use strict';

  if (!navigator.mediaDevices) return;

  const fakeDevices = [
    {
      deviceId: "default-mic",
      kind: "audioinput",
      label: "Microphone Array",
      groupId: "group-audio"
    },
    {
      deviceId: "default-speaker",
      kind: "audiooutput",
      label: "Speakers",
      groupId: "group-audio"
    },
    {
      deviceId: "default-camera",
      kind: "videoinput",
      label: "HD Webcam",
      groupId: "group-video"
    }
  ];

  Object.defineProperty(navigator.mediaDevices, "enumerateDevices", {
    value: async function () {
      return fakeDevices.map(function (d) {
        return Object.assign({}, d);
      });
    },
    configurable: true
  });
})();
