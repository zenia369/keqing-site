export type SubscribeObjectType<T> = {
  complete: (arg: T) => void
  error: ((error: Error, data: T) => void) | ((error: Error) => void)
}

export type SubscribeFunctionType<T> = (arg: T) => void

export type SubscribeHandlerType<T> =
  | SubscribeObjectType<T>
  | SubscribeFunctionType<T>

export type CreateObserverInitialValueType<T> = T

export type SubscribeWatchersType = string[]

export type SubsribesMapType<T> = Map<string, Set<SubscribeHandlerType<T>>>
