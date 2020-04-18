<template>
  <div class="vis-tracing">
    <div class="text-layer" :style="{width: `${width}px`, height: `${height}px`}">
    </div>
    <svg :width="width" :height="height">
      <g :style="{transform: `translate(${sizes[0] / 4}px, ${y}px)`}">
        <SymbolTimeline v-for="(a, i) in actors" :key="`a-${i}`" :k="`a-${i}`" :step="step" :progress="progress" :width="width * 0.8" :level="1" :actor="a"/>
      </g>
    </svg>
  </div>
</template>

<script>
import SymbolTimeline from '@/components/SymbolTimeline.vue'
export default {
  name: 'vis-tracing',
  components: {
    SymbolTimeline
  },
  props: {
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    step: {
      type: Number,
      default: null
    },
    progress: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      steps: {
        start: 0.1,
        symptoms: 1,
        isolation: 1.1,
        infectious: 2,
        infected: 2.5,
        expand: 3,
        symptoms2: 3.5,
        isolation2: 3.5,
        infectious2: 4,
        traced: 4.5
      },
      children: 12
    }
  },
  computed: {
    sizes () {
      const { width } = this
      return width < 720 ? [64, 24, 8].map(d => d * 0.75) : [64, 24, 8]
    },
    sp () {
      const { step, progress } = this
      return step + progress
    },
    y () {
      const { sizes, children, height } = this
      return (height - (sizes[0] * 1.5 + sizes[1] * 1.75 * (children / 3 * 2))) / 2
    },
    actors () {
      const { sp, steps, sizes, children } = this
      const width = this.width * 0.7
      const baselineWidth = Math.max(sp < (steps.symptoms * 1.5) ? (sp) * width / (steps.symptoms * 1.5) : width, sizes[0])
      const symptomsX = width / (children + 1) * 8.5
      return [{
        color: sp > steps.infectious ? 'purple' : 'purple',
        opacity: 1,
        x: 0,
        y: 0,
        size: sizes[0],
        baseline: {
          opacity: sp < steps.start ? 0 : 1,
          width: baselineWidth,
          class: sp > steps.infectious ? 'purple-light' : null
        },
        symptoms: {
          opacity: sp < steps.symptoms ? 0 : 1,
          cx: symptomsX
        },
        isolation: {
          opacity: sp < steps.isolation ? 0 : 1,
          width: Math.max(baselineWidth - symptomsX + sizes[0] / 4),
          x: symptomsX
        },
        children: '.'.repeat(children).split('').map((c, i) => {
          const x = width / (children + 1) * (i + 1)
          const distanced = i >= 8
          const infected = i === 2 || i === 6
          let y = (x > baselineWidth ? sizes[1] * 2 : 0) + (distanced ? sizes[0] * 0.625 : 0)
          if (sp > steps.expand) y = i * sizes[1] * 1.75 + sizes[0] / 2
          return {
            color: distanced ? null : infected && sp > steps.infected ? 'purple' : sp > steps.infectious ? 'yellow' : 'green',
            opacity: sp < steps.start || x > baselineWidth || (sp > steps.infectious && distanced) ? 0 : 1,
            x,
            y,
            size: sizes[1],
            baseline: distanced ? null : {
              opacity: sp < steps.expand ? 0 : 1,
              width,
              class: sp > steps.infectious2 && infected ? 'purple-light' : null
            },
            symptoms: !infected ? null : {
              opacity: sp < steps.symptoms2 ? 0 : 1,
              cx: symptomsX
            },
            isolation: {
              opacity: !infected || sp < steps.isolation2 || sp >= steps.traced ? 0 : 1,
              width: baselineWidth - symptomsX + sizes[1] / 4,
              x: symptomsX
            },
            tracedIsolation: {
              opacity: sp < steps.traced || distanced ? 0 : 1,
              width: baselineWidth - (symptomsX - x + sizes[1] / 2),
              x: symptomsX - x + sizes[1] / 2
            },
            children: distanced ? null : '.'.repeat(children).split('').map((c, i2) => {
              const x = width / (children + 1) * (i2 + 1)
              // const distanced = x > width / 3 * 2
              // let y = (x + sizes[1] > baselineWidth ? sizes[1] * 2 : 0) + (distanced ? sizes[0] * 0.75 : 0)
              // if (sp > steps.expand) y = (i + 1) * sizes[1] * 1.5
              return {
                color: sp > steps.infectious2 && infected ? 'yellow' : 'green',
                opacity: sp < steps.expand ||
                  (infected && sp > steps.isolation2 && i2 >= 8) ||
                  (sp > steps.traced && i2 + i + 1 >= 8) ? 0 : 1,
                x,
                y: (infected && sp > steps.isolation2 && i2 >= 8) ||
                  (sp > steps.traced && i2 + i + 1 >= 8) ? sizes[1] * 0.625 : 0,
                size: sizes[2]
              }
            })
          }
        })
      }]
    }
  },
  watch: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
@import "@/assets/style/global";
.vis-tracing {
  .text-layer {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    overflow: visible;
    display: block;
  }
}
</style>
