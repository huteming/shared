import { getCurrentInstance, onMounted } from '@vue/composition-api'

export default function tryOnMounted(callback: Function) {
  if (getCurrentInstance()) {
    onMounted(callback)
    return
  }
  callback()
}
