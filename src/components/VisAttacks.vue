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
    return {
      trackingIds: '.'.repeat(5).split('').map(() => `${Math.random().toString(36).split('.')[1].toUpperCase().slice(0, 4)}…`)
    }
  },
  computed: {
    sp () {
      const { step, progress } = this
      const sp = step + progress
      return sp
    },
    config () {
      const { sp, bw, table } = this
      const step = Math.floor(sp)
      const progress = sp % 1
      return {
        orbit: {
          hide: step >= 1 && sp !== 11,
          color: 'green'
        },
        actors: [{
          name: 'A',
          color: bw(0, 1) || bw(2, 3) ? 'purple' : 'pink',
          transmitting: true,
          transform: {
            r: 1,
            rev: step === 0 ? progress : 0,
            offset: 0
          },
          text: {
            show: bw(0.5, 2),
            offset: -48,
            html: table([[this.trackingIds[1], '10', '100']])
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
          show: bw(2, 3),
          color: bw(0, 3) ? 'green' : 'yellow',
          transmitting: true,
          transform: {
            r: 1,
            rev: 1 / 3,
            offset: 0
          }
        }, {
          name: 'C',
          show: bw(2, 3),
          color: bw(0, 3) ? 'green' : 'yellow',
          transmitting: true,
          transform: {
            r: 1,
            rev: 2 / 3,
            offset: 0
          }
        }, {
          name: 'E',
          show: bw(0, 4),
          color: bw(0, 1) || bw(2, 3) ? 'red' : 'yellow',
          transmitting: bw(0, 2),
          transform: {
            r: 1,
            rev: 1 / 2,
            offset: bw(0, 1) ? 40 : bw(1, 1.5) ? 40 * (1 - progress * 2) : 0
          },
          text: {
            show: bw(0.5, 2),
            offset: 48,
            html: table([[this.trackingIds[0], '10', '100']])
          }
        }, {
          name: 'M',
          show: false,
          color: 'red',
          transform: {
            r: 1,
            rev: 2 / 3
          }
        }, {
          name: '↔',
          show: bw(1, 2) || bw(3, 4),
          class: ['invert'],
          color: 'gray',
          transform: {
          },
          text: {
            show: bw(1, 2) || bw(3, 4),
            offset: 32,
            html: table([[`${this.trackingIds[0]}, …`]], null, ['IDs'])
          }
        },
        ...(bw(2, 4) ? this.trackingActors : [])
        ],
        edges: [{
          nodes: ['A', 'A-Base'],
          show: step === 0,
          color: 'purple',
          large: progress > 0.5,
          dir: 0
        }, {
          nodes: ['A', 'A-Base'],
          show: step === 0,
          color: 'green',
          large: progress < 0.5,
          dir: 1
        }, {
          nodes: ['A', '↔'],
          show: bw(1, 2) || bw(3, 4),
          color: 'yellow',
          dir: 1,
          r: bw(1, 2) ? 0 : 2 / 3
        }, {
          nodes: ['E', '↔'],
          show: bw(1, 2) || bw(3, 4),
          color: 'yellow',
          dir: 1,
          r: bw(1, 2) ? 0 : 2 / 3
        },
        ...(bw(2, 4) ? this.trackingEdges : [])
        ]
      }
    },
    trackingActors () {
      const { table, trackingIds, sp } = this
      const step = Math.floor(sp)
      const actors = 3
      return ['ALICE', 'BOB', 'CHAROL'].map((name, i) => {
        const rev = 1 / (actors) * (i)
        return {
          color: step === 2 ? 'red' : 'yellow',
          transmitting: true,
          directional: true,
          id: `trackingActor-${i}`,
          transform: {
            r: 1,
            rev,
            offset: -60,
            scale: 0.5
          },
          text: {
            show: true,
            offset: i === 0 ? 24 : -24,
            html: table([[trackingIds[i], name]], null, ['ID', 'IDENTITY'])
          }
        }
      }).filter((a, i) => step === 2 || i === 0)
    },
    trackingEdges () {
      const { trackingActors, sp } = this
      const step = Math.floor(sp)
      return trackingActors.map((actor, i) => {
        return {
          nodes: ['E', actor.id],
          color: step === 2 ? 'red' : 'yellow',
          dotted: true,
          dir: 1,
          r: 1
        }
      })
    }
  },
  watch: {
    'config.actors': {
      handler (actors) {
        const style = ['A', 'B', 'E', 'M'].map(name => {
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
    },
    table (rows, limit, head = ['ID', 'MIN', 'CM']) {
      const th = `<tr>${
          head.map(c => `<th>${c}</th>`).join('')
        }</tr>`
      const tr = rows.filter((r, i) => limit == null || i < limit).map(cols => {
        return `<tr>${
          cols.map(c => `<td>${c}</td>`).join('')
        }</tr>`
      }).join('')
      return `<table>
                ${th}
                ${tr}
              </table>`
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/global";
.vis-tracing {
}
</style>
