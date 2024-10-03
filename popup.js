let words = [];

const wordInputField = document.getElementById("wordInput");
const wordList = document.getElementById("wordList");

wordInputField.addEventListener("input", (e) => {
  wordList.innerText = "";
  createListItems(e.target.value);
});

function addWord() {
  const word = wordInputField.value.trim();

  if (word === "" || words.some((w) => w.title && w.title === word.toLowerCase())) {
    return;
  }
  chrome.runtime.sendMessage({ action: "saveCurseWord", curse: word }).then(() => {
    chrome.runtime.sendMessage({ action: "getCurseWords" }).then(({ items }) => {
      words = items;
      words.map((word) => {
        word.title = word.title.toLowerCase();
        wordList.appendChild(createListItem(word));
      });
    });
  });
}

function deleteWord(self_link) {
  chrome.runtime.sendMessage({ action: "deleteCurseWord", uri: self_link }).then(() => {
    chrome.runtime.sendMessage({ action: "getCurseWords" }).then(({ items }) => {
      words = items;
      words.map((word) => {
        word.title = word.title.toLowerCase();
        wordList.appendChild(createListItem(word));
      });
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

function createListItems(input) {
  if (!words.length) {
    return null;
  }
  const filteredWords = words.filter((word) => {
    if (!word.title) {
      return false;
    }
    return word.title.startsWith(input.toLowerCase());
  });

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
