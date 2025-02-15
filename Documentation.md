### AdFriend Chrome Extension - Documentation

## Overview

AdFriend is a Chrome extension that replaces intrusive advertisements with positive and meaningful content. Users can customize what replaces the ads, choosing between motivational quotes, activity reminders, or random uplifting messages.

## Features

Ad Blocking: Identifies and removes ads from web pages.

Content Replacement: Replaces ads with user-selected widgets.

User Preferences: Stores user selections in Chrome storage.

Dynamic Content Loading: Monitors and removes newly loaded ads.

CDN Ad Blocking: Blocks ads originating from external ad servers.

## Installation

Clone the repository or download the source code.

Open Google Chrome and navigate to chrome://extensions/.

Enable Developer mode (toggle in the top-right corner).

Click Load unpacked and select the extension folder.

The extension will now be active and ready for use.

## File Structure

AdFriend/
├── manifest.json           # Extension metadata and permissions
├── popup.html             # Popup UI for user settings
├── popup.css              # Styles for popup UI
├── popup.js               # Handles user interactions in popup
├── content.js             # Main script to detect and replace ads
├── background.js          # Manages blocking rules and extension events
├── icons/                 # Folder containing extension icons

manifest.json

Defines permissions, background scripts, and content scripts required by the extension.

popup.html

Provides the UI for users to select their preferred ad replacement option.

popup.js

Handles saving and retrieving user preferences using chrome.storage.sync.

content.js

Detects and replaces ads on web pages dynamically.

background.js

Handles background tasks, such as blocking specific ad URLs via chrome.declarativeNetRequest.

## Permissions Required

storage – To save user settings.

activeTab – To interact with the current web page.

declarativeNetRequest – To block ad requests.

scripting – To inject content scripts dynamically.

## How It Works

The popup UI lets users select a replacement widget.

The content script scans web pages for ads and replaces them based on user preferences.

The background script blocks ad requests from certain ad networks.

Changes are stored using chrome.storage.sync, so they persist across browser sessions.

## Handling Dynamic Ads

The extension uses a MutationObserver to monitor changes in the DOM and replace newly loaded ads.

## Blocking CDN Ads

The background script blocks requests from known ad-serving domains using Chrome's declarativeNetRequest API.

## Error Handling

If an error occurs while accessing chrome.storage.sync, it is logged to the console.

try-catch blocks are used where necessary to prevent crashes.

## Future Improvements

Add more customization options (e.g., user-defined messages).

Improve ad detection accuracy.

Support additional browsers.

## Contribution

Fork the repository.

Create a new branch (feature-xyz).

Commit your changes.

Push to your branch and create a pull request.

## License

This project is licensed under the MIT License.

## Contact

For support, reach out via tobexint@gmail.com .
