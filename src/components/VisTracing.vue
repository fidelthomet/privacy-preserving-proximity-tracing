<template>
  <div class="vis-tracing">
    <FigureTracing :config="config" :width="width" :height="height" :step="step" :progress="progress"/>
  </div>
</template>

<script>
import colors from '@/assets/style/global.scss'
import FigureTracing from '@/components/FigureTracing.vue'
export default {
  name: 'vis-tracing',
  components: {
    FigureTracing
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
    return {}
  },
  computed: {
    config () {
      const { step, progress } = this
      return {
        orbit: step < 2,
        actors: [{
          name: 'A',
          color: step < 2 ? 'purple' : 'pink',
          transmitting: false,
          isolation: true,
          transform: {
            r: 1,
            rev: step === 1 ? progress : 0,
            offset: 0
          },
          text: {
            hide: step < 1,
            offset: -48,
            html: '<table><tr><td>B</td><td>20min</td></tr><tr><td>C</td><td>1min</td></tr></table>'
          }
        }, {
          name: 'B',
          color: 'green',
          transmitting: true,
          isolation: step > 3,
          transform: {
            r: 1,
            rev: 1 / 3,
            offset: 48
          },
          text: {
            hide: step < 1,
            offset: 48,
            html: '<table><tr><td>B</td><td>20min</td></tr><tr><td>C</td><td>1min</td></tr></table>'
          }
        }, {
          name: 'C',
          color: 'green',
          transmitting: false,
          transform: {
            r: 1,
            rev: 2 / 3,
            offset: 48
          }
        }, {
          name: '+',
          hide: step < 2,
          color: 'red',
          class: ['invert'],
          transform: {
            r: 1,
            rev: 1 / 6,
            offset: 48
          }
        }],
        edges: [{
          nodes: ['A', '+'],
          hide: step < 2,
          color: 'red',
          dir: 0
        }, {
          nodes: ['A', '+'],
          color: 'red',
          hide: step < 3,
          dir: 1
        }]
      }
    }
  },
  watch: {
    'config.actors': {
      handler (actors) {
        const style = ['A', 'B', 'C'].map(name => {
          const color = actors.find(a => a.name === name).color
          return [
            [`--actor-${name.toLowerCase()}`, colors[color]],
            [`--actor-${name.toLowerCase()}-light`, colors[`light-${color}`]]
          ]
        }).flat()
        this.$parent.$emit('style', Object.fromEntries(style))
      },
      immediate: true
    }
  },
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
@import "@/assets/style/global";
.vis-tracing {
}
</style>
