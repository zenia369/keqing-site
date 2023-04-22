class KCookie {
  private cookie = new Map<string, string>()

  constructor() {
    this.init()
  }

  private init() {
    document.cookie
      .split(';')
      .map((c) => c.split('='))
      .forEach((c) => {
        this.cookie.set(c[0].trim(), c[1])
      })
  }

  getCookie() {
    return this.cookie
  }
}

export default new KCookie()
