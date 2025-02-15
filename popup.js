document.addEventListener("DOMContentLoaded", function () {
  const widgetTypeSelect = document.getElementById("widgetType");
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
