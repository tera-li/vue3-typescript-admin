<template>
  <section class="app-main">
    <router-view :key="key" v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <transition name="fadeIn">
          <component :is="Component" />
        </transition>
      </keep-alive>
    </router-view>
  </section>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const route = useRoute()
    const cachedViews = computed((): (String | undefined)[] => {
      return [...store.state.tagViews.cachedViews]
    })
    const key = () => {
      return route.path
    }
    return {
      cachedViews,
      key
    }
  }
})
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>
