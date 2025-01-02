import { loadScripts } from 'https://cdn.jsdelivr.net/gh/tmpmachine/vanilla-framework@latest/script-loader.js';

loadScripts([
  {
    urls: [
      "https://cdn.jsdelivr.net/gh/tmpmachine/vanilla-framework@latest/libs/dom-events.js",
      "js/events-map.js",
      "js/main-component.js",
    ],
    callback: () => {
      DOMEvents.Listen(eventsMap);
      compoMain.Init();
    },
  },
]);