/**
 * Checks if a given HTML element is likely an advertisement.
 * 
 * The function evaluates an element based on:
 * 1. Its size (small elements are often hidden ad markers).
 * 2. Presence of common ad-related keywords in the element's text, class, or ID.
 * 
 * @param {HTMLElement} element - The HTML element to check.
 * @returns {boolean} - Returns true if the element is identified as an ad, false otherwise.
 */
function isAd(element) {
  // List of common keywords found in ad-related elements
  const adKeywords = ["ad", "ads", "advert", "AdChoices", "ad-content", "banner-ad", "Sponsored", "promoted", "Advertisement"];
  // Maximum size (in pixels) for hidden ad markers or small ad labels
  const maxSize = 20;

  return (
    // Check if the element's dimensions are small (indicating a potential hidden ad marker)
    element.clientWidth < maxSize &&
    element.clientHeight < maxSize &&
    // Check if the element contains any ad-related keywords in its text, class, or ID
    adKeywords.some(keyword =>
      (element.innerText && typeof element.innerText === "string" && element.innerText.toLowerCase().includes(keyword)) || (element.className && typeof element.className === "string" && element.className.toLowerCase().includes(keyword)) ||
      (element.id && element.id.toLowerCase().includes(keyword))
  )
 );
}

/**
 * Replaces the content of an ad element with a custom message.
 *
 * This function modifies the detected ad element by inserting a styled
 * div that displays an "Ad Removed" message. This ensures that the ad
 * space is occupied, preventing layout shifts.
 * This prevents the webpage layout from breaking due to missing ad elements.
 * @param {HTMLElement} adElement - The HTML element identified as an ad.
 */
function replaceAds(adElement) {
  adElement.innerHTML = "<div style='background: #f9f9f9; text-align: center; padding: 10px; font-weight: bold;'>Ad Removed 🎉</div>";
}

/**
 * Replaces an ad element with a custom motivational widget.
 *
 * This function checks if the ad element exists and then retrieves the
 * user's preferred widget type from Chrome storage. Based on the widget
 * type, it replaces the ad with a styled div containing either a motivational
 * quote, a reminder, or a random positive message.
 *
 * @param {HTMLElement} adElement - The HTML element identified as an ad.
 */
function replaceAd(adElement) {
  // Ensure the ad element exists before proceeding
  if (!adElement) return;

  // Retrieve the user's preferred widget type from Chrome's synced storage
  chrome.storage.sync.get("widgetType", function (data) {
    const widgetType = data.widgetType || "random"; // Default to "random" if no preference is set

    // Create a new div to replace the ad
    const widget = document.createElement("div");
    widget.style.cssText = "width: 100%; height: 100%; background: #f9f9f9; display: flex; align-items: center; color: #333; font-size: 14px; font-weight: bold; justify-content: center; padding: 15px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); text-align: center; border-radius: 10px;";

    let content;
    // Determine the widget content based on the user's preference
    if (widgetType === "quotes") {
      content = "Stay positive! 🌟";  // Display a motivational quote
    } else if (widgetType === "reminders") {
      content = "Did you stretch today? 🏃";  // Display a reminder
    } else {
      // Display a random positive message
      const messages = ["You're doing great!", "Keep pushing forward!", "Enjoy the moment!"];
      content = messages[Math.floor(Math.random() * messages.length)];
    }

    // Set the text content of the widget
    widget.innerText = content;
    // Replace the ad element with the custom widget
    adElement.replaceWith(widget);
i  });
}

/**
 * Scans the webpage for potential ad elements and replaces them with custom widgets.
 *
 * This function searches for common ad-related elements using predefined CSS selectors.
 * It iterates through each found element, checks if it's an ad using the `isAd` function,
 * and replaces it with a custom widget using the `replaceAd` function.
 */
function scanAndReplaceAds() {
  // List of CSS selectors commonly used to identify ads on web pages
  const adSelectors = [
    "iframe",
    "ins",
    "[id*=ad]",
    //"iframe[class*='ads'],
    "iframe[src*='ads']",
    "iframe[id*='ads']",
    "iframe[aria-label*='ad']",
    "img[class*='ads_']",
    //"img[id*=ads'-]",
    "img[src*='_ads_']",
    ".ad-banner",
    ".adsbygoogle"
    //"section[class*='sponsored']",
    //"aside[class*='advertisement']"
  ];

  // Loop through each selector and find matching elements on the page
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      // Check if the element is truly an ad before replacing it
      if (isAd(el)) replaceAd(el);
    });
  });
}

// Target Google Ad Services ads
document.querySelectorAll("a[href*='googleadservices.com']").forEach(adLink => {
	let adContainer = adLink.closest("div");
        if (adContainer && isAd(adContainer)) {
		replaceAd(adContainer);
  }
});


/**
 * Identifies and removes advertisements served from a specific CDN.
 *
 * This function searches for anchor (`<a>`) elements that contain 
 * "dynamic-cdn.openweb.com" in their href attribute, indicating they are ads.
 * If a matching link is found, the function removes its closest `<div>` container
 * to eliminate the ad from the page.
 */
function blockCDNAds() {
    // Select all anchor tags containing the specified CDN URL in their href attribute
    const adLinks = document.querySelectorAll("a[href*='dynamic-cdn.openweb.com']");

    // Loop through each detected ad link
    adLinks.forEach((ad) => {
	// Log the detected ad URL for debugging purposes
        console.log("AdFriend: Blocking ad from CDN:", ad.href);
	// Remove the closest parent <div> container to ensure the entire ad structure is removed
        ad.closest("div")?.remove(); // Remove the closest ad container
    });
}

// Run the function after page load
document.addEventListener("DOMContentLoaded", blockCDNAds);

/**
 * Retrieves the user's preferred widget type from Chrome's storage and creates a custom widget.
 *
 * This function attempts to fetch the "widgetType" value from Chrome's sync storage.
 * - If an error occurs, it logs the error and exits early.
 * - If no widget type is found, it defaults to "random".
 * - It then creates a `<div>` element to serve as a placeholder widget.
 */
chrome.storage.sync.get("widgetType", function (data) {
  // Check for errors when accessing Chrome storage
  if (chrome.runtime.lastError) {
    console.error("Error accessing storage:", chrome.runtime.lastError);
    return; // Exit early if there's an issue
  }
  // Retrieve the stored widget type, defaulting to "random" if undefined
  const widgetType = data.widgetType || "random";

  // Create a new div element to serve as the widget container
  const widget = document.createElement("div");
  // Apply styling to the widget for proper display
  widget.style.cssText = "width: 100%; height: 100%; background: #f9f9f9; display: flex; align-items: center; color: #333;";

  // Add the widget to the DOM
});


/**
 * Observes changes in the DOM to detect dynamically inserted ads.
 *
 * - `MutationObserver` watches for new elements being added to the page.
 * - `scanAndReplaceAds` is triggered whenever a change occurs in the DOM.
 * - `childList: true` ensures that direct children of `document.body` are monitored.
 * - `subtree: true` extends monitoring to all nested elements, catching deeply inserted ads.
 * - This helps block ads that load dynamically after the initial page load.
 */
const observer = new MutationObserver(scanAndReplaceAds);
observer.observe(document.body, { childList: true, subtree: true });

/**
 * Ensures that ads are scanned and replaced after the page fully loads.
 *
 * - The `load` event fires when all resources (images, scripts, styles, etc.) are fully loaded.
 * - A `setTimeout` delay of 2000ms (2 seconds) is added to allow dynamic content (such as ads loaded via JavaScript) to appear before scanning.
 * - Calls `scanAndReplaceAds()` to identify and replace ads after the delay.
 */
window.addEventListener('load', () => {
    setTimeout(scanAndReplaceAds, 2000); // Delay execution to handle dynamically loaded ads.
});

/**
 * Waits for the DOM to fully load before scanning and replacing ads.
 *
 * - The `DOMContentLoaded` event ensures that the script runs only after the HTML document is completely loaded.
 * - It then calls `scanAndReplaceAds()` to identify and replace ad elements on the page.
 * - This prevents errors caused by trying to manipulate elements before they exist in the DOM.
 */
document.addEventListener("DOMContentLoaded", () => {
  scanAndReplaceAds(); // Scan the page and replace detected ads with custom content.
});
