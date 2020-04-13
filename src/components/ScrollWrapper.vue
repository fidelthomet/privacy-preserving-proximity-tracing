<template>
  <section class="scroll-wrapper">
    <figure v-resize:debounce.initial="onResize" :class="section" :style="{'max-width': `${maxWidth}px`}">
      <slot v-bind="{ step, progress, width, height }" >
        <div class="fallback">
          {{ section }} <br>
          {{ step }} <br>
          {{ progress }} <br>
          {{ width }} × {{ height }}<br>
        </div>
      </slot>
    </figure>
    <SectionRenderer :section="section"/>
  </section>
</template>

<script>
import SectionRenderer from '@/components/SectionRenderer.vue'
import 'intersection-observer'
import scrollama from 'scrollama'
import resize from 'vue-resize-directive'
export default {
  name: 'scroll-wrapper',
  components: { SectionRenderer },
  directives: {
    resize
  },
  props: {
    section: {
      type: String,
      default: null
    },
    maxWidth: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      scroller: scrollama(),
      step: 0,
      progress: 0,
      width: 800,
      height: 600
    }
  },
  mounted () {
    const { scroller, section, onEnter, onProgress, onExit } = this
    scroller.setup({
      step: `.scrolly.${section} .step`,
      offset: 0.5,
      progress: true
    }).onStepEnter(onEnter)
      .onStepProgress(onProgress)
      .onStepExit(onExit)
  },
  methods: {
    onEnter (step) {
      // console.log(`${this.section}– enter`, step)
      this.step = step.index
    },
    onProgress (step) {
      // console.log(`${this.section}– progress`, step)
      this.step = step.index
      this.progress = step.progress
    },
    onExit (step) {
      // console.log(`${this.section}– exit`, step)
      this.step = step.index
    },
    onResize (el) {
      const rect = el.getBoundingClientRect()
      this.width = rect.width
      this.height = rect.height
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.scroll-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  figure {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;

    .fallback {
      width: 100%;
      height: 100%;
      font-size: 2.5em;
      background: $color-accent;
      color: $color-white;
    }
  }
  .section-renderer {
    margin-top: -100vh;
    margin-bottom: 50vh;
    position: relative;
    pointer-events: none;
  }
}
</style>
