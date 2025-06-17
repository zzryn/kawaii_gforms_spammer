chrome.action.onClicked.addListener((tab) => {
  if (tab.url.includes("docs.google.com/forms") && !tab.url.includes("edit")) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  }
});
