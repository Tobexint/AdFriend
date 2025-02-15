# AdFriend Chrome Extension

AdFriend is a Chrome extension that replaces intrusive ads with positive content, such as motivational quotes, healthy reminders, and uplifting messages. This helps create a more enjoyable and distraction-free browsing experience.

## Features
- Replaces ads with **motivational quotes**, **activity reminders**, or **random positive messages**.
- Uses **custom ad selectors** to detect and remove ads from web pages.
- Blocks ads from **specific CDN sources**.
- Supports **user preferences** stored using Chrome's `storage.sync`.
- Dynamically detects new ads and replaces them.

## Installation
1. Download or clone this repository:
   ```bash
   git clone https://github.com/yourusername/AdFriend.git
   ```
2. Open **Google Chrome** and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (top right corner).
4. Click on **Load unpacked** and select the `AdFriend` folder.
5. The extension is now installed and active!

## Usage
1. Click on the **AdFriend** icon in the Chrome toolbar.
2. Select your preferred **replacement content** from the dropdown menu.
3. Click **Save** to apply your settings.
4. Reload any webpage to see AdFriend in action.

## File Structure
```
AdFriend/
│── manifest.json         # Chrome extension manifest file
│── popup.html            # Settings interface
│── popup.js              # Handles user preferences
│── popup.css             # Styles for settings UI
│── content.js            # Main script for detecting & replacing ads
│── background.js         # Background service worker for ad blocking
│── icons/                # Extension icons
└── README.md             # Project documentation
```

## Technical Details
- **Ad Detection**: Ads are identified using specific CSS selectors and keywords.
- **Storage API**: Uses `chrome.storage.sync` to store user preferences.
- **Content Script**: Runs on web pages to replace ads dynamically.
- **Declarative Net Request**: Blocks known ad-serving domains.
- **Mutation Observer**: Detects dynamically loaded ads for continuous ad removal.

## Known Issues
- Some sites may use advanced techniques to bypass ad detection.
- Certain dynamic ads might not be replaced immediately.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your forked repository:
   ```bash
   git push origin feature-branch
   ```
5. Open a **Pull Request** to the main repository.

## License
This project is licensed under the **MIT License**.

## Contact
For questions or suggestions, feel free to reach out via tobexint@gmail.com
