export type MessageType = 'error' | 'success' | 'warning'

export type QueueType = {
  text: string
  type: MessageType
  time: number
  id: string
  isForce?: boolean
}
