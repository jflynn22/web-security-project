requests = [];
let timeout = "";

const port = chrome.extension.connect({
  name: "requestIntercept"
});

port.postMessage({
  request: "requestIntercept"
});

port.onMessage.addListener(msg => {
  requests.push(msg.url);
  if (timeout !== "") {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    console.log(requests);
  }, 3000);
});
