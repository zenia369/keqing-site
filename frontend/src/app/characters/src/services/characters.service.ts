import { createObserver } from '@Lib/k-observer'
import { KFetchV1 } from '@Lib/k-fetch'

export interface CharactersCardItemType {
  name: string
  url: string
  poster: string
}

export interface CharactersCardType {
  game_href: string
  game_poster: string
  game_name: string
  items: CharactersCardItemType[]
}

interface CharactersType {
  images: CharactersCardType[]
}

class CharactersService {
  private observer = createObserver<CharactersType>({ images: [] })

  constructor() {
    this.get()
  }

  private async get() {
    const { data } = await KFetchV1.get<CharactersType>('images/characters')
    this.observer.subject.images = data.images
  }

  get getObserver() {
    return this.observer
  }
}

export default new CharactersService()
