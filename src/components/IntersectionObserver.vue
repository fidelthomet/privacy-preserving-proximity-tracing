<template>
  <div class="intersection-observer" ref="intersect">
    <div class="intersection-observer-inner blur">
      <slot>
        <h2>Step {{ step }} – {{ step + stepSize }}</h2>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'intersection-observer',
  props: {
    step: {
      type: Number,
      default: 0
    },
    stepSize: {
      type: Number,
      default: 1
    },
    observerOptions: {
      type: Object,
      default () {
        return {
          rootMargin: `-${0.5 * 100}% 0% -${100 - 0.5 * 100}% 0%`
        }
      }
    },
    // active: {
    //   type: Boolean,
    //   default: false
    // },
    align: {
      type: String,
      default: 'center'
    }
  },
  data () {
    return {
      active: false
    }
  },
  mounted () {
    const { $refs, observerOptions } = this
    const observer = new window.IntersectionObserver(entries => {
      if (entries.filter(entry => entry.isIntersecting).length < 1) {
        this.active = false
        return
      }
      requestAnimationFrame(this.watch)
      this.active = true
    }, observerOptions)

    observer.observe($refs.intersect)
  },
  methods: {
    watch () {
      const { active, $refs, step, stepSize } = this
      const rect = $refs.intersect.getBoundingClientRect()
      const offset = innerHeight * 0.5
      const scroll = Math.max(Math.min((offset - rect.top) / rect.height, 1), 0)
      this.$parent.$emit('step', { step, progress: scroll * stepSize })
      if (active) requestAnimationFrame(this.watch)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";

.intersection-observer {
  display: flex;
  flex-direction: column;
}
</style>
