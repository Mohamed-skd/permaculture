import { create, html, modClass, select, selectAll } from "./ts/funcs.js";

// GLOBAL COMPONENTS
const homepage = select("#homepage");
if (!homepage) throw new Error("No div#homepage :(");

// page top
const pageTop = select("#page-top");

if (pageTop) {
  pageTop.addEventListener("click", () => scroll(0, 0));
  addEventListener(
    "scroll",
    () => {
      scrollY > 300
        ? modClass(pageTop, "add", "visible")
        : modClass(pageTop, "del", "visible");
    },
    { passive: true }
  );
}

// page nav
const pageNav = select("#page-nav ul");
const pageSects = selectAll("main > section");
const pageSectsTitle = selectAll("section >h2");

if (pageNav && pageSects && pageSectsTitle) {
  const pageNavLink = (id: string, title: string) => {
    const listElem = create("li");
    const link = create("a", { href: `#${id}`, class: "link" });

    link.textContent = title;
    listElem.append(link);
    return listElem;
  };

  for (let x = 0; x < pageSects.length; x++) {
    const idSect = pageSects[x].getAttribute("id");
    const titleSect = pageSectsTitle[x].textContent;

    if (idSect && titleSect) pageNav.append(pageNavLink(idSect, titleSect));
  }
}

// theme
const mediaDark = matchMedia("(prefers-color-scheme:dark)");
const themeBt = select("#theme");
let darkMode = mediaDark.matches;

const theme = (isDark: boolean = darkMode) => {
  if (!themeBt) return;

  if (isDark) {
    html.style.colorScheme = "dark";
    themeBt.title = "Theme Clair";
    modClass(homepage, "add", "dark-mode");
    modClass(themeBt, "add", "dark-mode");
  } else {
    html.style.colorScheme = "light";
    themeBt.title = "Theme Sombre";
    modClass(homepage, "del", "dark-mode");
    modClass(themeBt, "del", "dark-mode");
  }
};

theme();
mediaDark.addEventListener("change", () => theme());
themeBt?.addEventListener("click", () => {
  darkMode = !darkMode;
  theme();
});

// copyright
const copyright = select("#copyright");
const date = new Date();

if (copyright)
  copyright.textContent = `Tout droit réservé © ${date.getFullYear()}`;

// PAGES COMPONENTS
// autoloader
const pageContent = select("body > div");

if (pageContent) {
  const module = pageContent.getAttribute("id");

  if (module) {
    import(`./components/${module}/app.ts`)
      .then((res) => res.default())
      .catch(console.error);
  }
}
