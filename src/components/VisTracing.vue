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
    sp () {
      const { step, progress } = this
      let sp = step + progress
      if (sp > 8.5) sp += 0.5
      if (sp > 10.5) sp += 0.5
      return sp
    },
    config () {
      const { sp, bw } = this
      const step = Math.floor(sp)
      const progress = sp % 1
      return {
        orbit: {
          hide: step >= 1,
          color: 'green'
        },
        actors: [{
          name: 'A',
          color: bw(0, 2) || bw(9, 10) || bw(11, 12) ? 'purple' : 'pink',
          transmitting: false,
          isolation: step >= 2 && step <= 8,
          transform: {
            r: 1,
            rev: step === 1 || step === 9 || step === 11 ? progress : 0,
            offset: 0
          },
          text: {
            hide: true,
            offset: -48,
            html: '<table><tr><td>B</td><td>20min</td></tr><tr><td>C</td><td>1min</td></tr></table>'
          }
        }, {
          name: 'A-Base',
          hide: true,
          transform: {
            r: 1,
            rev: 0,
            offset: 0
          }
        }, {
          name: 'B',
          color: bw(0, 4) || bw(9, 10) || bw(11, 12) ? 'green'
            : bw(4, 5) || bw(8, 10) ? 'purple' : 'yellow',
          transmitting: false,
          isolation: step >= 6 && step < 8,
          transform: {
            r: 1,
            rev: sp < 9.166 ? 1 / 2 : sp < 9.333 ? 1 / 2 - ((progress - 1 / 6)) : 1 / 3,
            offset: 40
          },
          text: {
            hide: true,
            offset: 48,
            html: '<table><tr><td>B</td><td>20min</td></tr><tr><td>C</td><td>1min</td></tr></table>'
          }
        }, {
          name: '+',
          hide: sp < 2.1 || sp >= 5,
          color: 'red',
          class: ['invert'],
          transform: {
            r: 1,
            rev: 1 / 6,
            offset: 48
          }
        }, {
          key: 'b0',
          hide: sp < 5 || sp >= 9,
          color: step < 7 || step >= 8 ? 'purple' : 'green',
          class: ['invert'],
          transform: {
            r: 0.8,
            rev: 0.6,
            offset: 0
          }
        }, {
          key: 'b1',
          hide: sp < 5.2 || sp >= 9,
          color: step < 7 || sp >= 8 ? 'purple' : 'green',
          class: ['invert'],
          transform: {
            r: 1,
            rev: 0.35,
            offset: 0
          }
        }, {
          key: 'b2',
          hide: sp < 5.4 || sp >= 9,
          color: step < 7 ? 'purple' : 'green',
          class: ['invert'],
          transform: {
            r: 0.2,
            rev: 0.65,
            offset: 0
          }
        }, {
          key: 'b3',
          hide: sp < 5.6 || sp >= 9,
          color: step < 7 ? 'purple' : 'green',
          class: ['invert'],
          transform: {
            r: 0.8,
            rev: 0.45,
            offset: 0
          }
        }, {
          name: 'C',
          color: sp < 10 || bw(11, 12) ? 'green' : 'purple',
          hide: step < 9,
          transform: {
            r: 1,
            rev: 2 / 3,
            offset: 40
          }
        }],
        edges: [{
          nodes: ['A', 'A-Base'],
          show: step === 1 || step === 9 || step === 11,
          color: 'purple',
          large: progress > 0.5,
          dir: 0
        }, {
          nodes: ['A', 'A-Base'],
          show: step === 1 || step === 9 || step === 11,
          color: 'green',
          large: progress < 0.5,
          dir: 1
        }, {
          nodes: ['A', '+'],
          hide: sp < 2.2 || sp >= 5,
          color: 'red',
          dir: 0
        }, {
          nodes: ['A', '+'],
          hide: step < 3 || sp >= 5,
          color: 'red',
          dir: 1
        }, {
          nodes: ['A', 'B'],
          color: step < 6 ? 'purple' : 'yellow',
          show: bw(4, 9) || bw(10, 11),
          dir: 0,
          r: step === 10 ? 2 : 1,
          dashed: step < 6,
          dotted: step === 8
        }, {
          nodes: ['A', 'C'],
          color: 'purple',
          show: bw(10, 11),
          dir: 1,
          r: 2,
          dashed: true
        }, {
          nodes: ['B', 'b0'],
          color: 'purple',
          hide: (sp < 5 || step >= 7) && step !== 8,
          dir: 1,
          r: 0,
          dashed: true
        }, {
          nodes: ['B', 'b1'],
          color: 'purple',
          hide: (sp < 5.2 || step >= 7) && step !== 8,
          dir: 0,
          r: 0,
          dashed: true
        }, {
          nodes: ['B', 'b2'],
          color: 'purple',
          hide: sp < 5.4 || step >= 7,
          dir: 1,
          r: 0,
          dashed: true
        }, {
          nodes: ['B', 'b3'],
          color: 'purple',
          hide: sp < 5.6 || step >= 7,
          dir: 0,
          r: 0,
          dashed: true
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
  methods: {
    bw (min, max) {
      const { sp } = this
      return sp >= min && sp < max
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/global";
.vis-tracing {
}
</style>
