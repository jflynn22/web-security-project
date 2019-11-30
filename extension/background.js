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

//Listener for adding random packets
chrome.extension.onMessage.addListener(async function(msg, sender, sendResponse) {

    var query = msg.query;

    console.log(query);

    //we have the query now we just need to send out a random packet

    var random_str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

    var index = Math.floor(Math.random() * query.length);

    var rand_index = Math.floor(Math.random() * random_str.length);

    var backspace = query.substr(0, query.length - 1);

    var new_query = "";

    if (query.length < 2) {
        new_query = random_str[rand_index];
    } else {
        new_query = query.substr(0, index) + random_str[rand_index] + query.substr(index + 1, query.length);
    }

    console.log(backspace);
    console.log(query);


    var ajax = $.ajax({
        type: 'GET',
        url: `https://www.google.com/complete/search?q=${new_query}`,
        error: function(e) {
        },
        dataType: 'json',
        contentType: 'json'
    });


    ajax = $.ajax({
        type: 'GET',
        url: `https://www.google.com/complete/search?q=${backspace}`,
        error: function(e) {
        },
        dataType: 'json',
        contentType: 'json'
    });


    var num_times = Math.floor(Math.random() * 5);

    for (let i = 0; i < num_times; i++) {
        index = Math.floor(Math.random() * query.length);
        rand_index = Math.floor(Math.random() * random_str.length);

        if (query.length < 2) {
            new_query = random_str[rand_index];
        } else {
            new_query = query.substr(0, index) + random_str[rand_index] + query.substr(index + 1, query.length);
        }
        // $.get(`https://www.google.com/complete/search?q=${new_query}`);
        ajax = $.ajax({
            type: 'GET',
            url: `https://www.google.com/complete/search?q=${new_query}`,
            error: function(e) {
            },
            dataType: 'json',
            contentType: 'json'
        });
        console.log("hi");
    }


});
