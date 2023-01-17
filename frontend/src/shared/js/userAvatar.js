(() => {
  const src = localStorage.getItem("avatarSrc");
  if (src) {
    const avatar = document.querySelector(".navigation__list__item__img");

    avatar.style = `background-image: url(${src})`;
  }
})();
