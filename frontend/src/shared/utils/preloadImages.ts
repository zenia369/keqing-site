export default (urls: string[]) => {
  return Promise.all(
    urls.map((url) => {
      const img = document.createElement('img')
      img.src = url
      return new Promise<string>((r) => {
        img.onload = () => {
          r(url)
        }
      })
    })
  )
}
