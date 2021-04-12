<template>
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'
import { useRouter } from 'vue-router'
import { AppActionTypes } from '@/store/modules/app/action-types'
import { useStore } from '@/store'
import resize from '@/layout/resize'

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const isMobile = resize().isMobile()
    const push = () => {
      if (isMobile) {
        store.dispatch(AppActionTypes.ACTION_CLOSE_SIDEBAR, true)
      }
      router.push(props.to).catch((err) => {
        console.log(err)
      })
    }
    return {
      push,
      isExternal
    }
  }
})
</script>
