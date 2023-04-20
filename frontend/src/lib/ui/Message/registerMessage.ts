import './index' // message component

import { QueueType } from './message.models'

export class RegisterMessage {
  private $el = document.createElement('kq-message')

  create() {
    document.body.appendChild(this.$el)
  }

  add(args: Pick<QueueType, 'type' | 'text' | 'time' | 'isForce'>) {
    this.$el.push({ ...args, id: crypto.randomUUID() })
  }
}

const registerMessage = new RegisterMessage()
registerMessage.create()

export default registerMessage
