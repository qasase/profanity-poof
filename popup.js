//var words = require("./words");
//import {words} from './words.js';
var words = [
  "luder",
  "röv",
  "satan"
];

function addWord(event) {
	words.push(document.getElementById('wordInput').value);
	document.getElementById('wordInput').value = '';
	document.getElementById('wordList').innerHTML = words.map((word) => {
        return `<li>${word}</li>`;
}).join('');
}


document.getElementById('addWord').addEventListener('click', addWord);


var parsed = "";
for (i = 0; i<words.length; i++) {
	var myobj=  words[i];
	for (var property in myobj) {
		parsed += property + ": " + myobj[property] + "\n";          
	}
}                           

document.getElementById('wordListWord').innerHTML = words.map((word) => {
	return `<li>${word}</li>`;
}).join('');  
