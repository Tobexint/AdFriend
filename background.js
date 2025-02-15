chrome.runtime.onInstalled.addListener(() => {
    console.log("AdFriend extension installed!");
});

chrome.runtime.onStartup.addListener(() => {
    console.log("Service worker started");
});

//chrome.webRequest.onBeforeRequest.addListener(
  //  function (details) { return { cancel: true }; },
    //{ urls: ["*://dynamic-cdn.openweb.com/*"] },
    //["blocking"]
//);

chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1], // Remove old rule if exists
        addRules: [
            {
                "id": 1,
                "priority": 1,
                "action": { "type": "block" },
                "condition": {
                    "urlFilter": "cdn.openweb.com/yad/adchoices.html", // Block specific ad URL
                    "resourceTypes": ["script", "xmlhttprequest", "sub_frame"]
                }
            }
        ]
    });
});

