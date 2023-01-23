//IMPORT

import "../style/style.scss";

// END IMPORT

window.addEventListener("load", () => {
  [...document.querySelectorAll(".loaded-content")].forEach((el) =>
    el.classList.remove("visibility")
  );
  [...document.querySelectorAll(".loader")].forEach((el) => el.classList.add("visibility"));
});

import KImages from "./modules/kImages";
import KVideo from "./modules/kVideo";

KVideo.active();
KImages.active();
