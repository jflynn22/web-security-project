full_request = [];
word = [];
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
  word.push(msg.url);
  if (msg.url.length - requests[requests.length-2].length > 1) {
    console.log("NEW WORD");
    word.pop();
    full_request.push(word);
    word = [];
    console.log(full_request[full_request.length-1]);
  }
  if (timeout !== "") {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    console.log(requests);
  }, 3000);
});
