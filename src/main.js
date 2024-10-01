const BAD_WORDS = ["ful", "dum"];
const CONFIG = { subtree: true, childList: true };
const BAD_WORD_REGEX = new RegExp(`\\b(${BAD_WORDS.join("|")})\\b`, "gi");

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
      if (BAD_WORD_REGEX.test(node.nodeValue)) {
        node.nodeValue = node.nodeValue.replace(BAD_WORD_REGEX, "****");
      }
    }
  }
};

const observer = new MutationObserver(onDomMutated);
observer.observe(document.body, CONFIG);
