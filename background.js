// Listen for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    console.log("AdFriend extension installed!");
});

// Listen for when the browser starts and the extension service worker is initialized
chrome.runtime.onStartup.addListener(() => {
    console.log("Service worker started");
});

/*
 * This block uses chrome.declarativeNetRequest to dynamically update filtering rules.
 * - Removes any existing rule with ID 1.
 * - Adds a new rule that blocks requests to a specific ad-related URL from cdn.openweb.com.
 */
chrome.runtime.onInstalled.addListener(() => {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [1], // Remove old rule if exists
        addRules: [
            {
                "id": 1, // Unique rule ID
                "priority": 1, // Set priority of the rule
                "action": { "type": "block" }, // Block the matching request
                "condition": {
                    "urlFilter": "cdn.openweb.com/yad/adchoices.html", // Block specific ad URL
                    "resourceTypes": ["script", "xmlhttprequest", "sub_frame"] // Types of resources to block
                }
            }
        ]
    });
});
