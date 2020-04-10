<template>
  <div id="app">
    <nav>
      <router-link v-for="l in languages" :key="l.path" :to="l.path">{{ l.name }}</router-link>
    </nav>
    <article>
      <SectionRenderer section="text-intro"/>
      <SectionRenderer section="text-reproduction"/>
      <ScrollWrapper section="vis-reproduction"/>
      <SectionRenderer section="text-tracing"/>
      <ScrollWrapper section="vis-tracing"/>
      <SectionRenderer section="text-app"/>
      <ScrollWrapper section="vis-app"/>
    </article>
  </div>
</template>
<script>
import SectionRenderer from '@/components/SectionRenderer.vue'
import ScrollWrapper from '@/components/ScrollWrapper.vue'
import { mapState } from 'vuex'
export default {
  name: 'App',
  components: {
    SectionRenderer,
    ScrollWrapper
  },
  computed: {
    ...mapState(['languages'])
  },
  watch: {
    '$route.params.lang': {
      handler (lang) {
        const { languages, $router, $store } = this
        if (lang == null) lang = 'en'
        if (languages.find(l => l.code === lang) == null) $router.push('/')
        $store.dispatch('setLanguage', lang)
        document.documentElement.setAttribute('lang', lang)
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/base";
</style>
<style lang="scss" scoped>
@import "@/assets/style/global";

#app {
  display: flex;
  flex-direction: column;
  align-items: center;

  nav {
    width: 100%;
    max-width: $max-width;
    margin: 0 $spacing / 8 $spacing / 2 $spacing / -8;
    a {
      color: $color-black;
      text-decoration: none;
      padding: 0 $spacing / 8;
      transition: color $transition;

      &.router-link-exact-active, &:hover {
        color: $color-accent;
      }
    }
  }

  article {
    width: 100%;
    max-width: $max-width;
  }
}
</style>
