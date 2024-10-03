// var words = require("./words");
// import {words} from './words.js';

var words = ["luder", "röv", "satan"];

window.onload = () => {
  chrome.runtime
    .sendMessage({
      action: "getCurseWords",
    })
    .then((r) => console.log(r));
};

function addWord(wordInput) {
  if (wordInput === "") {
    return;
  }

  words.push(wordInput);
}

function removeWord(event) {
  return;
}

function listWords() {
  words.map(function (word) {
    const listItem = document.createElement("li");
    const listWordText = document.createElement("span");
    listWordText.textContent = word;
    listItem.appendChild(listWordText);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    listItem.appendChild(deleteButton);

    document.getElementById("wordList").appendChild(listItem);
  });
}

var wordInputField = document.getElementById("wordInput");

document.getElementById("addWord").addEventListener("click", function () {
  addWord(wordInput.value.trim());
  wordInput.value = "";
  listWords();
});
//document.getElementById('removeWord').addEventListener('click', removeWord);

// function addWord(word) {
// 	if (word === '') {
// 		//document.getElementById('wordInput') = '';  vi gör det utanför
// 		return;
// 	}

// 	const listItem = document.createElement('li');
// 	const listWordText = document.createElement('span');
// 	listWordText.textContent = word;
// 	console.log(word);
// 	listItem.appendChild(listWordText);

// 	const deleteButton = document.createElement('button');
// 	deleteButton.textContent = 'x';
// 	listItem.appendChild(deleteButton);

// 	wordList.appendChild(listItem);

// 	deleteButton.addEventListener('click', function () {
// 		wordList.removeChild(listItem);
// 	});

// 	saveTasksToLocalStorage();
// }

// const wordList = document.getElementById('wordList');
// const wordInput = document.getElementById('wordInput'); //passar det att det är en const?

// document.getElementById('wordsForm').addEventListener('submit', function (event) {
// 	addWord(wordInput.value);
// 	wordInput.value = '';
// });

// function saveTasksToLocalStorage() {
// 	const words = [];
// 	document.querySelectorAll('#wordList li').forEach(wordLi => {
// 		const word = wordLi.querySelector('span').textContent;
// 		words.push(word);
// 	});
// 	localStorage.setItem('words', JSON.stringify(words));
// 	console.log(words);
// }

// window.onload = function () {
// 	const savedWords = JSON.parse(localStorage.getItem('words')) || [];
// 	savedWords.forEach(word => {
// 		addWord(word);
// 	});
// };

// document.addEventListener('DOMContentLoaded', function () {
// 	const savedWords = JSON.parse(localStorage.getItem('words')) || [];
// 	savedWords.forEach(word => {
// 		console.log(word);
// 		addWord(word.text);
// 	});
// });
