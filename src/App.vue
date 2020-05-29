<template>
  <div id="app">
    <header>
      <MdRenderer el="section" :text="getText('text-meta')"/>
      <h1>
        <span>Privacy</span><br>
        <span>Preserving</span><br>
        <span>Proximity</span><br>
        <span>Tracing</span>
      </h1>
      <MdRenderer el="section" :text="getText('text-teaser')"/>
    </header>
    <nav>
      <router-link v-for="l in languages" :key="l.path" :to="l.path">{{ l.name }}</router-link>
    </nav>
    <article>
      <MdRenderer el="section" class="intro" :text="getText('text-intro')"/>
      <MdRenderer el="section" :text="getText('text-reproduction')"/>
      <ScrollWrapper :text="getText('vis-reproduction')" section="vis-reproduction">
        <template v-slot="props">
          <VisReproduction v-bind="props"/>
        </template>
      </ScrollWrapper>
      <MdRenderer el="section" :text="getText('text-tracing')"/>
      <ScrollWrapper :text="getText('vis-tracing')" :max-width="720">
        <template v-slot="props">
          <VisTracing v-bind="props"/>
        </template>
      </ScrollWrapper>
      <MdRenderer el="section" :text="getText('text-privacy')"/>
      <ScrollWrapper :text="getText('vis-privacy')" :max-width="720">
        <template v-slot="props">
          <VisPrivacy v-bind="props"/>
        </template>
      </ScrollWrapper>
      <MdRenderer el="section" :text="getText('text-attacks')"/>
      <ScrollWrapper :text="getText('vis-attacks')" :max-width="720">
        <template v-slot="props">
          <VisAttacks v-bind="props"/>
        </template>
      </ScrollWrapper>
      <MdRenderer el="section" :text="getText('text-next')"/>
    </article>
    <img class="group-2" src="@/assets/img/group2.png"/>
    <footer>
      <MdRenderer el="section" :text="getText('text-footer')"/>
    </footer>
  </div>
</template>
<script>
import MdRenderer from '@/components/MdRenderer.vue'
import ScrollWrapper from '@/components/ScrollWrapper.vue'
import VisReproduction from '@/components/VisReproduction.vue'
import VisPrivacy from '@/components/VisPrivacy.vue'
import VisAttacks from '@/components/VisAttacks.vue'
import VisTracing from '@/components/VisTracing.vue'
// import { PortalTarget } from 'portal-vue'
// import LayoutScrollytelling from '@/components/LayoutScrollytelling.vue'
// import IntersectionObserverFracture from '@/components/IntersectionObserverFracture.vue'
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    MdRenderer,
    ScrollWrapper,
    VisReproduction,
    VisPrivacy,
    VisTracing,
    VisAttacks
    // PortalTarget
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

  header {
    background: url("~@/assets/img/group1.png") center center no-repeat;
    background-size: auto 100%;
    background-color: $color-background;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing / 4 0;

    @include min-width($narrow) {
      padding: $spacing 0;
    }
    > * {
      width: 100%;
      max-width: $max-width;
      padding: 0 $spacing / 2;
    }

    h1 {
      width: 100%;
      max-width: $max-width;
    }
  }

  nav {
    padding: 0 $spacing / 2;
    width: 100%;
    max-width: $max-width;
    margin: $spacing / 2 $spacing / 8 $spacing / 2 $spacing / -8;
    a {
      color: $color-black;
      padding: 0 $spacing / 8;
      text-decoration: none;
      transition: color $transition / 2;

      &.router-link-exact-active, &:hover {
        color: $color-accent;
      }
    }
  }

  article {
    width: 100%;
    display: flex;
      flex-direction: column;
      align-items: center;
    > .md-renderer {
      padding: 0 $spacing / 2;
    }
  }

  .intersection-observer-fracture {
    padding-top: 50vh;
    &:last-child {
      padding-bottom: 50vh;
    }
  }

  .group-2 {
    width: 100%;
    max-width: $max-width;
    margin-bottom: $spacing / 2;
  }

  footer {
    padding: $spacing 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: $color-background;

    > * {
      width: 100%;
      max-width: $max-width;
      padding: 0 $spacing / 2;
    }
  }
}
</style>
