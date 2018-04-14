
var button = document.getElementById("keeptabs");

// Changes "enabled" if button is clikced
button.onclick = function(event) {
  let storingdata = browser.storage.local.set({
    "enabled": true
  });
  // Changes the color of the button
  button.style.background = "#8bc6c5";
  save();
};

var save = function() {
  // Queries all opened tabs
  let tabs = browser.tabs.query({
    currentWindow: true
  });
  tabs.then((tabs) => {
    let list = [];
    // URLs are saved in a list
    for (let tab of tabs) {
      list.push(tab.url);
      console.log(tab.url);
    }
    // URL list is saved
    browser.storage.local.set({
      "openedtabs": list
    });
  }, function onError(error) {
    console.log(`Error ${error}`);
  });
};
