<template>
  <div>
    <input v-model="username" />
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Hello',

  data() {
    return {
      username: '',
    }
  },

  computed: {
    error() {
      return this.username.trim().length < 7 ? 'Please enter a longer username' : ''
    },
  },
})
</script>
