import { Ref, ref, watch } from '@vue/composition-api'
import { UseStorageConfig } from './types'
import { getSerializer } from './utils'
import { MaybeValueOrGetter, isDefined, isNil, toValue } from 'helpers'

export default function useStorage<T>(key: string, defaults: MaybeValueOrGetter<T>, options: Partial<UseStorageConfig> = {}): Ref<T | null> {
  const { writeDefaults = true, storage = window.localStorage } = options

  const initial = toValue(defaults)
  const serializer = getSerializer<T>(initial)

  const data = ref(
    toValue(() => {
      const cache = storage.getItem(key)

      if (isNil(cache)) {
        if (writeDefaults && isDefined(initial)) {
          storage.setItem(key, serializer.write(initial))
        }
        return initial
      }

      return serializer.read(cache)
    }),
  ) as Ref<T | null>

  watch(data, (val) => {
    if (isNil(val)) {
      storage.removeItem(key)
      return
    }

    const serialized = serializer.write(val)
    const oldValue = storage.getItem(key)
    if (oldValue !== serialized) {
      storage.setItem(key, serialized)
    }
  })

  return data
}
