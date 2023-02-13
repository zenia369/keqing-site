;(() => {
  const src = localStorage.getItem('avatarSrc')
  const avatar = document.querySelector('.navigation__list__item__img')
  if (src && avatar) {
    avatar.style = `background-image: url(${src})`
  }
})()
