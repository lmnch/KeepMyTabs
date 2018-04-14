let windowpromise = browser.windows.getCurrent();
windowpromise.then((window) => {
  runIfActivated(onStart, window);
});

// If the checkbox was checked the function will be executed
var runIfActivated = function(func, args) {
  let activatedpromise = browser.storage.local.get("enabled");
  activatedpromise.then((run) => {
    if (run["enabled"]) {
      func(args);
    }
  });
};


var onStart = function(window) {
  // The first tab of the window has to be closed
  let tabtoclosepromise = browser.tabs.query({active: true});

  // Gets the list with the tabs which should be opened
  let gettingItem = browser.storage.local.get("openedtabs");
  gettingItem.then((result) => {
    let tabs = result["openedtabs"];
    // Opens each tab in list
    for (let taburl of tabs) {
      browser.tabs.create({
        url: taburl
      });
    }
  });
  let storingdata = browser.storage.local.set({
    "enabled": false
  });
  // Closes the first tab
  tabtoclosepromise.then((tabs)=>{
    browser.tabs.remove(tabs[0].id);
  });
};
