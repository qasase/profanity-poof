let words = [];
let inputWord = "";

const wordInputField = document.getElementById("word-input");
const wordList = document.getElementById("word-list");

wordInputField.addEventListener("input", (e) => {
  inputWord = e.target.value.toLowerCase().trim();
  if (!inputWord) {
    wordList.innerText = "";
    return;
  }
  createListItems();
});

function addWord() {
  chrome.runtime
    .sendMessage({ action: "saveCurseWord", curse: inputWord })
    .then(getAndCreateListItems);
}

function deleteWord(self_link) {
  chrome.runtime
    .sendMessage({ action: "deleteCurseWord", uri: self_link })
    .then(getAndCreateListItems);
}

function getAndCreateListItems() {
  chrome.runtime.sendMessage({ action: "getCurseWords" }).then(({ items }) => {
    words = items;
    createListItems();
  });
}

function createListItem(word) {
  const listItem = document.createElement("li");
  const listWordText = document.createElement("span");

  listWordText.textContent = word.title;
  listItem.appendChild(listWordText);

  const deleteButton = document.createElement("button");
  deleteButton.onclick = () => deleteWord(word._self_link);
  deleteButton.className = "delete-button";
  deleteButton.appendChild(createXIcon());
  listItem.appendChild(deleteButton);
  return listItem;
}

function createListItems() {
  if (!words.length) {
    return null;
  }
  wordList.innerText = "";
  const filteredWords = words.filter((word) => {
    if (!word.title) {
      return false;
    }
    return word.title.startsWith(inputWord);
  });

  filteredWords.map((word) => {
    wordList.appendChild(createListItem(word));
  });
  document.documentElement.style.height = "0px";
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addWord();
});

window.onload = () => {
  chrome.runtime.sendMessage({ action: "getCurseWords" }).then(({ items }) => {
    words = items;
  });
};

function createXIcon(size = 24, color = "currentColor", strokeWidth = 2) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", size);
  svg.setAttribute("height", size);
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", color);
  svg.setAttribute("stroke-width", strokeWidth);
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  // Create the first path (top-left to bottom-right)
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("d", "M18 6 6 18");

  // Create the second path (top-right to bottom-left)
  const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path2.setAttribute("d", "m6 6 12 12");

  // Append paths to the SVG
  svg.appendChild(path1);
  svg.appendChild(path2);

  return svg;
}
