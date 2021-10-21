const { doWork } = require('./shortcuts_for_asana');

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(doWork);
