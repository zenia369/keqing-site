class KCookie {
  #cookie = new Map();

  constructor() {
    this.#init();
    return this.#cookie;
  }

  #init() {
    document.cookie
      .split(";")
      .map((c) => c.split("="))
      .forEach((c) => {
        this.#cookie.set(c[0].trim(), c[1]);
      });
  }
}

export default new KCookie();
