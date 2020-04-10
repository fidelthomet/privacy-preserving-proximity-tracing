<template>
  <section class="scroll-wrapper">
    <figure>
      <slot>
        <div class="fallback">
          {{ section }} <br>
          {{ step }} <br>
          {{ progress }} <br>
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
export default {
  name: 'scroll-wrapper',
  components: { SectionRenderer },
  props: {
    section: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      scroller: scrollama(),
      step: 0,
      progress: 0
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
    margin-top: -50vh;
    position: relative;
  }
}
</style>
