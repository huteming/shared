<template>
  <div :class="wrapperClasses" @click="onClick">
    <div class="typography__core">
      <div :class="wordingClasses">
        <slot />
      </div>

      <transition name="fade">
        <div v-show="loading" class="typography__overlay">
          <i class="icon-loading" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Typography',

  props: {
    type: {
      type: String as PropType<'link'>,
    },
    inline: {
      type: Boolean,
    },
    loading: {
      type: Boolean,
    },
  },

  setup() {},

  data() {
    return {}
  },

  computed: {
    wrapperClasses(): string[] {
      const values = ['typography']
      if (this.inline) {
        values.push('typography--inline')
      }
      return values
    },
    wordingClasses(): string[] {
      const values = ['typography__wording']
      if (this.type === 'link') {
        values.push('typography--link')
      }
      return values
    },
  },

  methods: {
    onClick() {
      this.$emit('click')
    },
  },
})
</script>

<style scoped lang="scss">
.typography {
  &__core {
    display: inline-block;
    position: relative;
  }

  &__wording {
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: #6e7680;
  }

  &__overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(255, 255, 255);
    opacity: 0.8;
    transition: opacity 0.3s;
    cursor: wait;
  }

  &--inline {
    display: inline-block;
  }

  &--link {
    color: #0e72ed;
    cursor: pointer;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
