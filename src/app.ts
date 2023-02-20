import { create, html, modClass, select, selectAll } from "./utils/ts/funcs.js";

// GLOBAL COMPONENTS
const pageContent = select("body > div")!;

// page top
const pageTop = select("#page-top")!;

pageTop.addEventListener("click", () => scroll(0, 0));
addEventListener(
  "scroll",
  () => {
    scrollY > 600
      ? modClass(pageTop, "add", "visible")
      : modClass(pageTop, "del", "visible");
  },
  { passive: true }
);

// page nav
const pageNav = select("#page-nav ul")!;
const pageSects = selectAll("main > section")!;
const pageSectsTitle = selectAll("section >h2")!;

const pageNavLink = (id: string, title: string) => {
  const listElem = create("li");
  const link = create("a", { href: `#${id}`, class: "link" });

  link.textContent = title;
  listElem.append(link);
  return listElem;
};

for (let x = 0; x < pageSects.length; x++) {
  const idSect = pageSects[x].getAttribute("id")!;
  const titleSect = pageSectsTitle[x].textContent!;

  pageNav.append(pageNavLink(idSect, titleSect));
}

// theme
const mediaDark = matchMedia("(prefers-color-scheme:dark)");
const themeBt = select("#theme")!;
let darkMode = mediaDark.matches;

const theme = (isDark: boolean = darkMode) => {
  if (isDark) {
    html.style.colorScheme = "dark";
    themeBt.title = "Theme Clair";
    modClass(pageContent, "add", "dark-mode");
    modClass(themeBt, "add", "dark-mode");
  } else {
    html.style.colorScheme = "light";
    themeBt.title = "Theme Sombre";
    modClass(pageContent, "del", "dark-mode");
    modClass(themeBt, "del", "dark-mode");
  }
};

theme();
mediaDark.addEventListener("change", () => theme());
themeBt.addEventListener("click", () => {
  darkMode = !darkMode;
  theme();
});

// copyright
const copyright = select("#copyright")!;
const date = new Date();

copyright.textContent = `Tout droit réservé © ${date.getFullYear()}`;

// PAGES COMPONENTS
// autoloader
const module = pageContent.getAttribute("id")!;

import(`./components/${module}/app.ts`)
  .then((res) => res.default())
  .catch(console.error);
