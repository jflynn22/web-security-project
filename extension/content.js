full_request = [];
word = [];
word_sizes = [];
requests = [];
let timeout = "";


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
  msg_size = generate_size(msg.url);
  if (word == null || word.length == 0) {
    word.push(' ');
    word_sizes.push(msg_size-1);
  }
  word.push(msg.url);
  word_sizes.push(msg_size);
  var size_diff = 0;
  if (word.length > 1) {
    size_diff = msg_size - generate_size(word[word.length-2]);
  }

  if (size_diff > 1 && size_diff < 10 && (msg.url.match(/cp=10+[A-Za-z&]/) === null || (generate_size(msg.url + 'ab') - generate_size(word[word.length-2])) > 3)) {
    console.log((generate_size(msg.url + 'ab') - generate_size(word[word.length-2])));
    console.log("NEW WORD");
    word.pop();
    full_request.push(word);
    sequence = [];
    var extra_size = 0;
      for (j = 1; j < word_sizes.length-1; j++) {
        var growth_size = word_sizes[j] - word_sizes[0];
        console.log(word[j]);
        if (word_sizes[j] - word_sizes[j-1] > 10 && extra_size === 0) {
            extra_size = word_sizes[j] - word_sizes[j-1];
      }
        if (growth_size > 10) {
            growth_size = growth_size - extra_size
        }
      sequence.push(growth_size);
    }
    console.log('Growth Sequence: [' + sequence + ']');
    console.log('The possible words are: [' + dictionary[sequence] + ']');
    word = [];
    word_sizes = [];
    word.push(msg.url);
    word_sizes.push(generate_size(msg.url));
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
