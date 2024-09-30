const BAD_WORDS = ["ful", "dum"];
const config = { attributes: true, subtree: true, childList: true };

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      replaceInnerTextInTag("p");
      console.log("A child node has been added or removed.");
    } else if (mutation.type === "attributes") {
      console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(document.body, config);

function replaceInnerTextInTag(tagName) {
  const tags = document.querySelectorAll(tagName);
  tags.forEach((tag) => {
    if (!BAD_WORDS.some((word) => tag.innerText.includes(word))) return;
    BAD_WORDS.forEach(
      (word) => (tag.innerText = tag.innerText.replaceAll(word, "!@)%)@")),
    );
  });
}
