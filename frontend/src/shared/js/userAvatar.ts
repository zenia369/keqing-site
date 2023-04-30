import { getLSItem } from '@Util/storage'
import { LOCAL_AVATAR_KEY, USER_AVATAR_NODE } from '@Shared/constans'

// eslint-disable-next-line prettier/prettier, import/newline-after-import
;(() => {
  const src = getLSItem(LOCAL_AVATAR_KEY)
  const avatar = document.querySelector(USER_AVATAR_NODE) as HTMLElement
  if (src && avatar) {
    avatar.style.backgroundImage = `url('${src}')`
  }
})()
