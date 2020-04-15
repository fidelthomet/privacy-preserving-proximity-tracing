<template>
  <div id="app">
    <nav>
      <router-link v-for="l in languages" :key="l.path" :to="l.path">{{ l.name }}</router-link>
    </nav>
    <article>
      <MdRenderer el="section" :text="getText('text-intro')"/>
      <MdRenderer el="section" :text="getText('text-reproduction')"/>
      <ScrollWrapper :text="getText('vis-reproduction')">
        <template v-slot="props">
          <VisReproduction v-bind="props"/>
        </template>
      </ScrollWrapper>
      <MdRenderer el="section" :text="getText('text-tracing')"/>
      <ScrollWrapper section="vis-tracing"/>
      <MdRenderer el="section" :text="getText('text-app')"/>
      <ScrollWrapper :text="getText('vis-reproduction')">
        <template v-slot="props">
          <VisApp v-bind="props"/>
        </template>
      </ScrollWrapper>
      <MdRenderer el="section" :text="getText('text-app')"/>
      <!-- <LayoutScrollytelling class="full-width">
        <template v-slot:vis="{ width, height, step }">
          <VisApp v-bind="{ width, height, step: Math.floor(step), progress: step % 1 }"/>
        </template>
        <template v-slot:text="{ width, height, step }">
          <section class="observers observers-options">
            <IntersectionObserverFracture :step="0">{{ width }} | {{ height }} | {{ Math.round(step * 100) / 100 }}</IntersectionObserverFracture>
            <IntersectionObserverFracture :step="1">{{ width }} | {{ height }} | {{ Math.round(step * 100) / 100 }}</IntersectionObserverFracture>
            <IntersectionObserverFracture :step="2">{{ width }} | {{ height }} | {{ Math.round(step * 100) / 100 }}</IntersectionObserverFracture>
            <IntersectionObserverFracture :step="3">{{ width }} | {{ height }} | {{ Math.round(step * 100) / 100 }}</IntersectionObserverFracture>
            <IntersectionObserverFracture :step="4">{{ width }} | {{ height }} | {{ Math.round(step * 100) / 100 }}</IntersectionObserverFracture>
            <IntersectionObserverFracture :step="5">{{ width }} | {{ height }} | {{ Math.round(step * 100) / 100 }}</IntersectionObserverFracture>
          </section>
        </template>
      </LayoutScrollytelling> -->
      <!-- <ScrollWrapper section="vis-app">
        <template v-slot="props">
          <VisApp v-bind="props"/>
        </template>
      </ScrollWrapper> -->
    </article>
  </div>
</template>
<script>
import MdRenderer from '@/components/MdRenderer.vue'
import ScrollWrapper from '@/components/ScrollWrapper.vue'
import VisReproduction from '@/components/VisReproduction.vue'
import VisApp from '@/components/VisApp.vue'
// import LayoutScrollytelling from '@/components/LayoutScrollytelling.vue'
// import IntersectionObserverFracture from '@/components/IntersectionObserverFracture.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    MdRenderer,
    ScrollWrapper,
    VisReproduction,
    VisApp
    // LayoutScrollytelling,
    // IntersectionObserverFracture
  },
  computed: {
    ...mapGetters(['getText']),
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

  .intersection-observer-fracture {
    padding-top: 50vh;
    &:last-child {
      padding-bottom: 50vh;
    }
  }
}
</style>
