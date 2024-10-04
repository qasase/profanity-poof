const API_KEY = "Vu3L54Q2JpCZUjYnQXxwP-l1_tfmfhcRhpMweyDGl8XY9UPEvw";
const BASE_URI = "https://crudapi.co.uk/api/v1/curse";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

async function saveCurseWord(curse) {
  try {
    const response = await fetch(BASE_URI, {
      method: "POST",
      headers,
      body: JSON.stringify([{ title: curse, completed: false }]),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function getCurseWords() {
  try {
    const response = await fetch(BASE_URI, {
      method: "GET",
      headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function deleteCurseWord(uri) {
  if (!uri) return;

  try {
    const response = await fetch(uri, {
      method: "DELETE",
      headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "deleteCurseWord":
      deleteCurseWord(request.uri).then(sendResponse);
      break;
    case "getCurseWords":
      getCurseWords().then((response) => {
        sendResponse(response);
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          let activeTab = tabs[0];
          chrome.tabs.sendMessage(activeTab.id, {
            words: response.items.map((item) => item.title),
          });
        });
      });
      break;
    case "saveCurseWord":
      saveCurseWord(request.curse).then(sendResponse);
      break;
    default:
      null;
  }

  return true;
});
