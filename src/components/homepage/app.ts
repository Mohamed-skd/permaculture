import { create, formatText, select } from "../../ts/funcs.js";
import { affiliationArticle, affiliationList } from "../../ts/types.js";

export default function homepage() {
  // cultivate
  const cultGrid = select("#cultivate > .grid");

  const affiliationElem = (elem: affiliationArticle) => {
    const { name, img, link } = elem;
    const article = create("article");
    const artLink = create("a", { href: link, target: "_blank" });
    const artImg = create("img", { src: img, alt: name });
    const artName = create("p", { class: "link" });

    artName.textContent = formatText(name);
    artLink.append(artImg, artName);
    article.append(artLink);

    return article;
  };
  const cultDatasFetch = async () => {
    const cultDatas = await fetch("data/cultivate.json");
    const cultDatasListe: affiliationList = await cultDatas.json();

    cultDatasListe.map((data) => cultGrid?.append(affiliationElem(data)));
  };

  cultDatasFetch();
}
