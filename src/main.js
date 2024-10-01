const BAD_WORDS = ["ful", "dum"];
const CONFIG = { subtree: true, childList: true };
const BAD_WORD_REGEX = new RegExp(`\\b(${BAD_WORDS.join("|")})\\b`, "i");
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
      if (treeWalker.currentNode.hasAttribute("data-censor")) {
        continue;
      }
      if (BAD_WORD_REGEX.test(node.nodeValue)) {
        const words = node.nodeValue.split(/(\s+)/);
        node.nodeValue = "";

        words.map((word) => {
          if (BAD_WORD_REGEX.test(word)) {
            const button = document.createElement("button");
            button.innerText = getRandomGrawlix();
            button.onclick = () => console.log(word);
            treeWalker.currentNode.appendChild(button);
          } else {
            treeWalker.currentNode.appendChild(document.createTextNode(word));
          }

          treeWalker.currentNode.setAttribute("data-censor", "true");
        });
      }
    }
  }
};

const observer = new MutationObserver(onDomMutated);
observer.observe(document.body, CONFIG);
