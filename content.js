function isAd(element) {
  const adKeywords = ["ad", "ads", "advert", "AdChoices", "ad-content", "banner-ad", "Sponsored", "promoted", "Advertisement"];
  const maxSize = 20;

  return (
    element.clientWidth < maxSize &&
    element.clientHeight < maxSize &&
    adKeywords.some(keyword =>
      (element.innerText && typeof element.innerText === "string" && element.innerText.toLowerCase().includes(keyword)) || (element.className && typeof element.className === "string" && element.className.toLowerCase().includes(keyword)) ||
      (element.id && element.id.toLowerCase().includes(keyword))
  )
 );
}

function replaceAds(adElement) {
  adElement.innerHTML = "<div style='background: #f9f9f9; text-align: center; padding: 10px; font-weight: bold;'>Ad Removed 🎉</div>";
}

function replaceAd(adElement) {
  if (!adElement) return;

  chrome.storage.sync.get("widgetType", function (data) {
    const widgetType = data.widgetType || "random";

    const widget = document.createElement("div");
    widget.style.cssText = "width: 100%; height: 100%; background: #f9f9f9; display: flex; align-items: center; color: #333; font-size: 14px; font-weight: bold; justify-content: center; padding: 15px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); text-align: center; border-radius: 10px;";

    let content;
    if (widgetType === "quotes") {
      content = "Stay positive! 🌟";
    } else if (widgetType === "reminders") {
      content = "Did you stretch today? 🏃";
    } else {
      const messages = ["You're doing great!", "Keep pushing forward!", "Enjoy the moment!"];
      content = messages[Math.floor(Math.random() * messages.length)];
    }

    widget.innerText = content;
    adElement.replaceWith(widget);
i  });
}

function scanAndReplaceAds() {
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

  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
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


// Function to remove ads from a specific CDN
function blockCDNAds() {
    const adLinks = document.querySelectorAll("a[href*='dynamic-cdn.openweb.com']");

    adLinks.forEach((ad) => {
        console.log("AdFriend: Blocking ad from CDN:", ad.href);
        ad.closest("div")?.remove(); // Remove the closest ad container
    });
}

// Run the function after page load
document.addEventListener("DOMContentLoaded", blockCDNAds);

chrome.storage.sync.get("widgetType", function (data) {
  if (chrome.runtime.lastError) {
    console.error("Error accessing storage:", chrome.runtime.lastError);
    return;
  }
  const widgetType = data.widgetType || "random";

  const widget = document.createElement("div");
  widget.style.cssText = "width: 100%; height: 100%; background: #f9f9f9; display: flex; align-items: center; color: #333;";

  // Add the widget to the DOM
});


// Observe page changes to replace new ads
const observer = new MutationObserver(scanAndReplaceAds);
observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener('load', () => {
    setTimeout(scanAndReplaceAds, 2000); // Delay for dynamic content loading
});

document.addEventListener("DOMContentLoaded", () => {
  scanAndReplaceAds();
});

