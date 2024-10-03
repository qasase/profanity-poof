let words = [];
let inputWord = "";

const wordInputField = document.getElementById("wordInput");
const wordList = document.getElementById("wordList");

wordInputField.addEventListener("input", (e) => {
  inputWord = e.target.value.toLowerCase().trim();
  if (!inputWord) {
    return;
  }
  createListItems();
});

function addWord() {
  const word = wordInputField.value.trim();

  chrome.runtime
    .sendMessage({ action: "saveCurseWord", curse: word })
    .then(() => {
      chrome.runtime
        .sendMessage({ action: "getCurseWords" })
        .then(({ items }) => {
          words = items;
          createListItems();
        });
    });
}

function deleteWord(self_link) {
  chrome.runtime
    .sendMessage({ action: "deleteCurseWord", uri: self_link })
    .then(() => {
      chrome.runtime
        .sendMessage({ action: "getCurseWords" })
        .then(({ items }) => {
          words = items;
          createListItems();
        });
    });
}

function createListItem(word) {
  const listItem = document.createElement("li");
  const listWordText = document.createElement("span");

  listWordText.textContent = word.title;
  listItem.appendChild(listWordText);

  const deleteButton = document.createElement("button");
  deleteButton.onclick = () => deleteWord(word._self_link);
  deleteButton.textContent = "x";
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
    console.log("inputWord", inputWord);
    console.log(word.title, inputWord);
    return word.title.startsWith(inputWord);
  });
  console.log(filteredWords);
  filteredWords.map((word) => {
    wordList.appendChild(createListItem(word));
  });
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
