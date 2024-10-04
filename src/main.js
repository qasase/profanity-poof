let badWords = [];
const CONFIG = { subtree: true, childList: true };
const GRAWLIX = [
  "$&*@!%",
  "&@$",
  "@*$!&",
  "%$*!@&",
  "$@&%*!",
  "!&@$*%$%@",
  "@&$%!*%*@",
];

const getRandomGrawlix = () =>
  GRAWLIX[Math.floor(Math.random() * GRAWLIX.length)];

const onDomMutated = (mutationList) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      replaceBadWords();
    }
  }
};

const treeFilter = (node) => {
  if (node.nodeName === "STYLE" || node.nodeName === "SCRIPT") {
    return NodeFilter.FILTER_SKIP;
  }
  return NodeFilter.FILTER_ACCEPT;
};

const replaceBadWords = () => {
  if (!badWords || !badWords.length) {
    return;
  }
  const BAD_WORD_REGEX = new RegExp(`\\b(${badWords.join("|")})\\b`, "i");
  const treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    treeFilter,
  );
  while (treeWalker.nextNode()) {
    for (const node of treeWalker.currentNode.childNodes) {
      if (node.nodeType !== Node.TEXT_NODE) {
        continue;
      }
      //FIXME
      // if (treeWalker.currentNode.hasAttribute("data-censor")) {
      //   continue;
      // }
      if (BAD_WORD_REGEX.test(node.nodeValue)) {
        treeWalker.currentNode.setAttribute("data-censor", "true");
        const words = node.nodeValue.split(/(\s+)/);
        node.nodeValue = "";

        words.map((word) => {
          if (BAD_WORD_REGEX.test(word)) {
            treeWalker.currentNode.appendChild(createCensorButton(word));
          } else {
            treeWalker.currentNode.appendChild(document.createTextNode(word));
          }
        });
      }
    }
  }
};

const createCensorButton = (word) => {
  const button = document.createElement("button");
  const censoredClass = "poof-censor-button--censored";
  const revealedClass = "poof-censor-button--revealed";

  button.classList.add("poof-censor-button");
  button.classList.add(censoredClass);

  button.setAttribute("data-curse", word);
  button.setAttribute("data-grawlix", getRandomGrawlix());

  button.onclick = () => {
    if (button.classList.contains(censoredClass)) {
      button.classList.add(revealedClass);
      button.classList.remove(censoredClass);
    } else {
      button.classList.add(censoredClass);
      button.classList.remove(revealedClass);
    }
  };
  return button;
};

const observer = new MutationObserver(onDomMutated);
observer.observe(document.body, CONFIG);

chrome.runtime.onMessage.addListener(function (request) {
  if (!request.words) {
    return;
  }
  badWords = request.words.filter(Boolean);
  replaceBadWords();
});
