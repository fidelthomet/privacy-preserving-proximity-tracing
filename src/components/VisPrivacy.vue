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
      trackingIds: '.'.repeat(5).split('').map(() => `${Math.random().toString(36).split('.')[1].toUpperCase().slice(0, 7)}…`),
      contactIds: '.'.repeat(2).split('').map(() => `${Math.random().toString(36).split('.')[1].toUpperCase().slice(0, 4)}…`)
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
          color: bw(0, 2) ? 'purple' : 'pink',
          transmitting: true,
          transform: {
            r: 1,
            rev: step === 0 ? progress : 0,
            offset: 0
          },
          text: {
            show: bw(1, 3),
            offset: -48,
            html: table([[this.contactIds[1], '30', '150']])
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
          show: bw(1, 3),
          color: bw(0, 2) ? 'green' : 'yellow',
          transmitting: true,
          transform: {
            r: 1,
            rev: 1 / 3,
            offset: 0
          },
          text: {
            show: bw(1, 3),
            offset: 48,
            html: table([[this.contactIds[0], '30', '150']])
          }
        }, {
          name: 'E',
          show: step === 0,
          color: 'red',
          transform: {
            r: 0
          }
        }, {
          name: 'M',
          show: bw(1, 3),
          color: 'red',
          transform: {
            r: 1,
            rev: 2 / 3
          }
        }, {
          name: '↔',
          show: bw(1, 3),
          class: ['invert'],
          color: 'gray',
          transform: {
          },
          text: {
            show: step === 2,
            offset: 32,
            html: table([[`${this.contactIds[0]}, …`]], null, ['IDs'])
          }
        },
        ...(step === 0 ? this.trackingActors : [])
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
          nodes: ['M', '↔'],
          show: bw(1, 3),
          color: 'red',
          r: 0,
          dotted: true
        }, {
          nodes: ['A', 'B'],
          show: step === 1,
          color: 'purple',
          dashed: true,
          r: 4
        }, {
          nodes: ['B', 'A'],
          show: step === 1,
          color: 'green',
          dashed: true,
          r: 4
        }, {
          nodes: ['A', '↔'],
          show: bw(2, 3),
          color: 'yellow',
          r: 0
        }, {
          nodes: ['B', '↔'],
          show: bw(2, 3),
          color: 'yellow',
          r: 0
        },
        ...(step === 0 ? this.trackingEdges : [])
        ]
      }
    },
    trackingActors () {
      const { sp, table, trackingIds } = this
      const progress = sp % 1
      const actors = 5
      return '.'.repeat(actors).split('').map((d, i) => {
        const rev = 1 / (actors + 1) * (i + 1)
        return {
          color: 'red',
          transmitting: false,
          id: `trackingActor-${i}`,
          transform: {
            r: 1,
            rev,
            offset: 40,
            scale: 0.5
          },
          text: {
            hide: progress < rev,
            offset: i === 0 || i === 4 ? -24 : 24,
            html: table([[trackingIds[i]]], null, ['ID'])
          }
        }
      })
    },
    trackingEdges () {
      const { trackingActors } = this
      return trackingActors.map(actor => {
        return {
          nodes: ['E', actor.id],
          color: 'red',
          dotted: true,
          r: 0
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
