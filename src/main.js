const BAD_WORDS = ["ful", "dum"];
const TAGS = ["p", "span", "label"];
const CONFIG = { attributes: true, subtree: true, childList: true };

console.log("Profanity Poof is running...");

const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      replaceInnerTextInTags();
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(document.body, CONFIG);

function replaceInnerTextInTags() {
  const tags = document.querySelectorAll(TAGS);
  const badWordRegex = new RegExp(`\\b(${BAD_WORDS.join("|")})\\b`, "gi");

  tags.forEach((tag) => {
    if (
      badWordRegex.test(tag.innerText) &&
      !tag.hasAttribute("data-censored")
    ) {
      tag.setAttribute("data-censored", "");
      tag.innerText = tag.innerText.replace(badWordRegex, "!@)%)@");
    }
  });
}
