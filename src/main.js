const BAD_WORDS = ["ful", "dum"];
const config = { attributes: true, subtree: true, childList: true };

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      replaceInnerTextInTag("p");
      replaceInnerTextInTag("span");
      console.log("A child node has been added or removed.");
    } else if (mutation.type === "attributes") {
      return;
      console.log(`The ${mutation.attributeName} attribute was modified.`);
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(document.body, config);

function replaceInnerTextInTag(tagName) {
  const tags = document.querySelectorAll(tagName);
  const badWordRegex = new RegExp(`\\b(${BAD_WORDS.join("|")})\\b`, "gi");

  tags.forEach((tag) => {
    if (tag.hasAttribute("data-censored")) return;
    if (badWordRegex.test(tag.innerText)) {
      tag.setAttribute("data-censored", "");
      tag.innerText = tag.innerText.replace(badWordRegex, "!@)%)@");
    }
  });
}
