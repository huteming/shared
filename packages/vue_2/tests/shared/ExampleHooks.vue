<template>
  <div>
    <div class="count">{{ count }}</div>
    <button @click="add">add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

function useCount() {
  const count = ref(0)
  setTimeout(() => {
    count.value++
  }, 10)
  return count
}

export default defineComponent({
  name: 'ExampleHooks',

  setup() {
    const count = useCount()
    return {
      count
    }
  },

  methods: {
    add() {
      this.count++
    }
  }
})
</script>
