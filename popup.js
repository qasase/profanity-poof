//var words = require("./words");
//import {words} from './words.js';

// var words = [
// 	"luder",
// 	"röv",
// 	"satan"
// ];

// function addWord(event) {
// 	var wordInput = document.getElementById('wordInput').value.trim()

// 	console.log(wordInput);
// 	if (wordInput === '') {
// 		document.getElementById('wordInput') = '';
// 		return;
// 	}

// 	words.push(wordInput);
// 	document.getElementById('wordInput') = '';
// 	document.getElementById('wordList').innerHTML = words.map((word) => {
// 		return `<li>${word}</li>`;
// 	}).join('');
// }

// function addListWord(event) {
// 	if (wordIput === '') { return; }
// 	//word not already in list
// 	const listWord = document.createElement('li');
// 	listWord.textContent = wordInput;
// 	words.push(wordIput);
// }

// function removeWord(event) {
// 	return;
// }

// //var wordInputField = document.getElementById('wordInput')

// //document.getElementById('addWord').addEventListner('click', addListWord);
// document.getElementById('addWord').addEventListener('click', addWord);
// //document.getElementById('removeWord').addEventListener('click', removeWord);







function addWord(word) {
	if (word === '') {
		//document.getElementById('wordInput') = '';  vi gör det utanför
		return;
	}

	const listItem = document.createElement('li');
	const listWordText = document.createElement('span');
	listWordText.textContent = word;
	listItem.appendChild(listWordText);

	const deleteButton = document.createElement('button');
	deleteButton.textContent = 'x';
	listItem.appendChild(deleteButton);

	wordList.appendChild(listItem);



	deleteButton.addEventListener('click', function () {
		wordList.removeChild(listItem);
	});

	saveTasksToLocalStorage();
}

const wordList = document.getElementById('wordList');
const wordInput = document.getElementById('wordInput'); //passar det att det är en const?

document.getElementById('wordsForm').addEventListener('submit', function (event) {
	addWord(wordInput.value);
	wordInput.value = '';

	const savedWords = JSON.parse(localStorage.getItem('words')) || [];
	savedWords.forEach(word => {
		addWord(word.text);
	});
});

function saveTasksToLocalStorage() {
	const words = [];
	document.querySelectorAll('#wordList li').forEach(wordLi => {
		const word = wordLi.querySelector('span').textContent;
		words.push(word);
	});
	localStorage.setItem('words', JSON.stringify(words));
	console.log(words);
}

document.addEventListener('DOMContentLoaded', function () {
	const savedWords = JSON.parse(localStorage.getItem('words')) || [];
	savedWords.forEach(word => {
		addWord(word.text);
	});
});