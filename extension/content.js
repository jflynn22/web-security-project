full_request = [];
word = [];
word_sizes = [];
requests = [];
let timeout = "";
/*var charLength = {
  'a': 5,
  'b': 6,
  'c': 5,
  'd': 6,
  'e': 5,
  'f': 6,
  'g': 6,
  'h': 6,
  'i': 5,
  'j': 7,
  'k': 7,
  'l': 6,
  'm': 6,
  'n': 6,
  'o': 5,
  'p': 6,
  'q': 7,
  'r': 6,
  's': 5,
  't': 5,
  'u': 6,
  'v': 7,
  'w': 7,
  'x': 7,
  'y': 7,
  'z': 7
};*/

function generate_size (url) {
  var size = 0;
  for (i = 0; i < url.length; i++) {
    if (charLength[url[i]] != null) {
    size = size + charLength[url[i]];}
  }
  return Math.ceil(size/8);
}

const port = chrome.extension.connect({
  name: "requestIntercept"
});

port.postMessage({
  request: "requestIntercept"
});

port.onMessage.addListener(msg => {
  if (full_request == null) {
    word.push(' ');
    word_sizes.push(0);
  }
  // requests.push(msg.url);
  word.push(msg.url);
  word_sizes.push(generate_size(msg.url));
  //console.log(generate_size(msg.url));
  if (word.length > 1 && msg.url.length - word[word.length-2].length > 1) {
    console.log("NEW WORD");
    word.pop();
    full_request.push(word);
    sequence = []
    for (j = 1; j < word.length; j++) {
      sequence.push(word_sizes[j] - word_sizes[0])
    }
    console.log(sequence);
    console.log(dictionary[sequence]);
    word = [];
    word_sizes = [];
    word.push(msg.url);
    word_sizes.push(generate_size(msg.url));
    console.log(full_request[full_request.length-1]);
  }
});

// send message from the content script to the background script
document.addEventListener("keyup", function(event) {
    console.log("hi");
    var bar = document.getElementsByName("q");

    var input = bar[0].value; // the current query in the bar

    //send to the background script

    chrome.runtime.sendMessage({query: input});
});
