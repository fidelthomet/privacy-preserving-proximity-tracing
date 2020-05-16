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
      contactIds: '.'.repeat(4).split('').map(() => `${Math.random().toString(36).split('.')[1].toUpperCase()}`)
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
          hide: step > 0,
          color: 'green'
        },
        actors: [{
          name: 'A',
          color: bw(0, 4) ? 'purple' : 'pink',
          transmitting: true,
          transform: {
            r: 1,
            rev: bw(1, 4) ? (sp - 1) / 3 : 0,
            offset: 0
          },
          text: {
            show: bw(1, 5),
            offset: -48,
            html: table([[this.getId(0, 4)], [this.getId(3, 4)]].filter((d, i) => i < 1 || sp > 2.5), null, ['Transmitted IDs'])
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
          show: bw(0, 6),
          color: bw(0, 5) ? 'green' : 'yellow',
          transmitting: true,
          transform: {
            r: 1,
            rev: 1 / 3,
            offset: 40
          },
          text: {
            show: bw(2, 6),
            offset: 48,
            html: table([[this.getId(0), '30', '150']])
          }
        }, {
          name: 'C',
          show: true,
          color: bw(0, 5) ? 'green' : 'yellow',
          transform: {
            r: 1,
            rev: 2 / 3,
            offset: 40
          },
          text: {
            show: bw(3, 6),
            offset: 48,
            html: table([[this.getId(3), '30', '150']])
          }
        }, {
          key: 'transmission',
          show: false,
          color: sp < 4.5 ? 'pink' : 'gray',
          transform: {
            r: step < 4 ? 1 : step === 4 ? 1 - progress : 0,
            rev: 0,
            offset: 0
          },
          text: {
            show: bw(4, 6),
            offset: 32,
            html: table([[this.getId(0, 4)], [this.getId(3, 4)]], null, [''])
          }
        }, {
          name: '↔',
          show: bw(4, 6),
          class: ['invert'],
          color: 'gray',
          transform: {
          },
          text: {
            show: step > 5,
            offset: 32,
            html: table([[`${this.getId(0)}, …`]], null, ['IDs'])
          }
        }],
        edges: [{
          nodes: ['A', 'A-Base'],
          show: bw(1, 4),
          color: 'purple',
          large: sp > 2.5,
          dir: 0
        }, {
          nodes: ['A', 'A-Base'],
          show: bw(1, 4),
          color: 'green',
          large: sp < 2.5,
          dir: 1
        }, {
          nodes: ['A', '↔'],
          show: bw(4, 5),
          color: 'yellow',
          r: 0
        }, {
          nodes: ['B', '↔'],
          show: bw(5, 6),
          color: 'yellow',
          r: 0
        }, {
          nodes: ['C', '↔'],
          show: bw(5, 6),
          color: 'yellow',
          r: 0
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
    },
    getId (id, length = 4) {
      return `${this.contactIds[id].slice(0, length)}…`
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/global";
.vis-tracing {
}
</style>
