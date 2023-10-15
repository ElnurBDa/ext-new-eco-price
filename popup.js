document.addEventListener('DOMContentLoaded', function() {
    var convertButton = document.getElementById('convertButton');
    var resetButton = document.getElementById('resetButton');
  
    convertButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'add' });
      });
    });
  
    resetButton.addEventListener('click', function() {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'reset' });
      });
    });
  });