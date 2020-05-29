<template>
  <div class="scroll-wrapper">
    <div class="vis">
      <figure v-resize:debounce.initial="onResize"
        :class="section" :style="{'max-width': `${maxWidth}px`}">
        <slot v-bind="{ step, progress, width, height }">
          <div class="fallback">
            {{ section }} <br>
            {{ step }} <br>
            {{ progress }} <br>
            {{ width }} × {{ height }}<br>
          </div>
        </slot>
      </figure>
    </div>
    <section class="text" :style="style">
      <IntersectionObserver v-for="(t, i) in text" :key="`o-${i}`" :step="i">
        <MdRenderer :class="{active: step === i}" :text="t" :portal="section != null ? `${section}-${i}` : null"/>
      </IntersectionObserver>
    </section>
  </div>
</template>

<script>
import IntersectionObserver from '@/components/IntersectionObserver.vue'
import MdRenderer from '@/components/MdRenderer.vue'
// import scrollama from 'scrollama'
import resize from 'vue-resize-directive'
export default {
  name: 'scroll-wrapper',
  components: {
    IntersectionObserver,
    MdRenderer
  },
  directives: {
    resize
  },
  props: {
    text: {
      type: Array,
      default () {
        return ['A', 'B', 'C']
      }
    },
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
      // scroller: scrollama(),
      step: 0,
      progress: 0,
      width: 800,
      height: 600,
      style: {}
    }
  },
  created () {
  },
  mounted () {
    // const { scroller, section, onEnter, onProgress, onExit } = this
    // scroller.setup({
    //   step: `.scrolly.${section} .step`,
    //   offset: 0.5,
    //   progress: true
    // }).onStepEnter(onEnter)
    //   .onStepProgress(onProgress)
    //   .onStepExit(onExit)

    this.$on('style', style => {
      this.style = style
    })
    this.$on('step', ({ step, progress }) => {
      this.step = step
      this.progress = progress
    })
  },
  methods: {
    setStyle (e) {
      console.log(e)
    },
    onEnter (step) {
      // console.log(`${this.section}– enter`, step)
      this.step = step.index
    },
    onProgress (step) {
      // console.log(`${this.section}– progress`, step)
      // console.log(step.progress)
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
  width: 100%;
  margin: $spacing * 1.5 0 $spacing * 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  .vis {
    position: sticky;
    top: 0;
    background: $color-background;
    height: 100vh;
    width: 100%;
    z-index: -1;
    display: flex;
    justify-content: center;
    align-items: center;
    figure {
      height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: -1;

      .fallback {
        width: 100%;
        overflow: hidden;
        height: 100%;
        font-size: 2.5em;
        background: $color-accent;
        color: $color-white;
      }
  }
  }
  .text {
    margin-top: -100vh;
    padding: 25vh 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include min-width($narrow) {
      // align-items: flex-end;
    }
    .intersection-observer {
      padding: 25vh 0;

      .md-renderer {
        width: 100%;
        max-width: 420px;
        font-size: 0.8em;
        padding: 0 $spacing / 2;
        transition: opacity $transition;
        opacity: 0.25;
        &.active {
          opacity: 1;
        }
      }

      &:last-of-type {
        padding: 25vh 0 50vh;
      }
    }
  }
}
</style>
