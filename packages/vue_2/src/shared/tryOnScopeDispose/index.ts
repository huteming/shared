import { getCurrentScope, onScopeDispose } from '@vue/composition-api'

export default function tryOnScopeDispose(callback: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(callback)
  }
}
