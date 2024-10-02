//var words = require("./words");
//import {words} from './words.js';
var words = [
  "luder",
  "röv",
  "satan"
];

function addWord(event) {
	var wordInput = document.getElementById('wordInput').value

	console.log(wordInput);
	if (wordInput === '') {
	//	alert('Please enter a real word!');
		return;
	}

	words.push(wordInput);
	wordInput = '';
	document.getElementById('wordList').innerHTML = words.map((word) => {
        return `<li>${word}</li>`;
	}).join('');
}

function addListWord(event) {
	if (wordIput === '') { return; }
	//word not already in list
	const listWord = document.createElement('li');
	listWord.textContent = wordInput;
	words.push(wordIput);
}

function removeWord(event) {
	return;
}

var wordInput = document.getElementById('wordInput').value 

//document.getElementById('addWord').addEventListner('click', addListWord);
document.getElementById('addWord').addEventListener('click', addWord);
//document.getElementById('removeWord').addEventListener('click', removeWord); 
