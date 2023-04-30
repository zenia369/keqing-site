import {
  CreateObserverInitialValueType,
  SubscribeHandlerType,
  SubscribeWatchersType,
  SubsribesMapType,
} from './types'

function createReactiveObject<T extends object>(
  _value: T,
  data: T,
  subsribesMap: SubsribesMapType<T>,
  observerId: string,
  tree: SubscribeWatchersType = []
) {
  const getPath = (key: string) => tree.concat(key).join('.')
  const proxyHelper: ProxyHandler<T> = {
    set(...args) {
      const path: string = getPath(args[1] as string)
      const success = Reflect.set(...args)

      if (success) {
        const isWatched = subsribesMap.has(path)
        try {
          if (isWatched) {
            subsribesMap.get(path)?.forEach((s) => {
              if (typeof s === 'function') {
                requestAnimationFrame(() => s(data))
              } else if (typeof s === 'object') {
                requestAnimationFrame(() => s.complete(data))
              }
            })
          }
          subsribesMap.get(observerId)?.forEach((s) => {
            if (typeof s === 'function') {
              requestAnimationFrame(() => s(data))
            } else if (typeof s === 'object') {
              requestAnimationFrame(() => s.complete(data))
            }
          })
        } catch (error: any) {
          subsribesMap.forEach((set) => {
            set.forEach((s) => {
              if (typeof s === 'object') {
                requestAnimationFrame(() => s.error(error, data))
              }
            })
          })
        }
      }
      return success
    },
    get(...args) {
      const value = Reflect.get(...args)

      if (
        value &&
        typeof value === 'object' &&
        ['Array', 'Object'].includes(value.constructor.name)
      ) {
        return createReactiveObject<T>(
          value as T,
          data,
          subsribesMap,
          observerId,
          tree.concat(args[1] as string)
        )
      }

      return value
    },
  }

  return new Proxy(_value, proxyHelper)
}

export function createObserver<T extends object>(_value: T) {
  const data: T = structuredClone(_value)
  const observerId: string = crypto.randomUUID()

  const subsribesMap: SubsribesMapType<T> = new Map()

  const addSubscriberHelper = (
    handler: SubscribeHandlerType<T>,
    watcher = observerId
  ) => {
    const subSet = subsribesMap.get(watcher)
    if (subSet) {
      subSet.add(handler)
    } else {
      subsribesMap.set(watcher, new Set<SubscribeHandlerType<T>>().add(handler))
    }
  }

  const subject = createReactiveObject(
    data,
    data,
    subsribesMap,
    observerId
  ) as CreateObserverInitialValueType<T>

  const subscribe = (
    handler: SubscribeHandlerType<T>,
    watchers?: SubscribeWatchersType
  ): (() => void) => {
    if (watchers === undefined || watchers.length === 0) {
      addSubscriberHelper(handler)
    } else if (watchers.length > 0) {
      watchers.forEach((w) => {
        addSubscriberHelper(handler, w as string)
      })
    }

    return () => {
      if (watchers === undefined || watchers.length === 0) {
        subsribesMap.get(observerId)?.delete(handler)
      } else if (watchers.length > 0) {
        watchers.forEach((w) => {
          subsribesMap.get(w as string)?.delete(handler)
        })
      }
    }
  }

  return { subject, subscribe }
}
