// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Get the dropdown element where users select their preferred widget type
  const widgetTypeSelect = document.getElementById("widgetType");
  // Get the save button element that users click to save their settings
  const saveButton = document.getElementById("saveSettings");

  // Load stored settings
  chrome.storage.sync.get("widgetType", function (data) {
    if (data.widgetType) widgetTypeSelect.value = data.widgetType;
  });

  // Save settings when button is clicked
  saveButton.addEventListener("click", function () {
    chrome.storage.sync.set({ widgetType: widgetTypeSelect.value }, function () {
      alert("Settings saved!");
      window.close();
    });
  });
});
