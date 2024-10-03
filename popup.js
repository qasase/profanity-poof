let words = [];

const wordInputField = document.getElementById("wordInput");
const wordList = document.getElementById("wordList");

wordInputField.addEventListener("input", (e) => {
  wordList.innerText = "";
  createListItems(e.target.value);
});

function addWord(wordInput) {
  if (wordInput === "") {
    return;
  }
  words.push(wordInput);
}

function createListItem(word) {
  const listItem = document.createElement("li");
  const listWordText = document.createElement("span");

  listWordText.textContent = word;
  listItem.appendChild(listWordText);

  const deleteButton = document.createElement("button");
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
    return word.title.toLowerCase().startsWith(input.toLowerCase());
  });

  filteredWords.map((word) => {
    wordList.appendChild(createListItem(word.title));
  });
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});

window.onload = () => {
  console.log("hej");
  chrome.runtime.sendMessage({ action: "getCurseWords" }).then(({ items }) => {
    words = items;
  });
};
