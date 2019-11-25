chrome.extension.onConnect.addListener(function(port) {
  port.onMessage.addListener(function(msg) {
    if (msg.request === "requestIntercept") {
      chrome.webRequest.onBeforeRequest.addListener(
        function(details) {
          if (details.url.indexOf("://www.google.com/complete") != -1) {
            console.log(details);
            port.postMessage(details);
          }
        },
        { urls: ["<all_urls>"] },
        ["blocking"]
      );
    }
  });
});
