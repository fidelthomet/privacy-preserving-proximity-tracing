<template>
  <div class="vis-reproduction" ref="el">
    <div class="text-layer">
      <transition name="fade">
      <div class="slider" v-if="step === 3 || step === 4">
        <div class="blur">
          <div class="label">
            <span v-if="step === 3">Immunity</span>
            <span v-if="step === 4">Isolation</span>
            <span>{{Math.round(immunity * 100)}}%</span>
          </div>
          <input type="range" min="0" max="1" v-model="immunity" step="0.01"/>
        </div>
      </div>
      </transition>
      <div class="rO-labels">
        <span v-for="(l, i) in r0Labels" :key="`l-${i}`"
          :style="{transform: `translate(${l.x}px, ${l.y}px)`, opacity: l.opacity}">
          {{l.text}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import P5 from 'p5'
export default {
  name: 'vis-reproduction',
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
      sketch: null,
      lineHeight: 24,
      gapY: 8,
      lines: 8,
      padding: 32,
      gapX: 12,
      qS: 2,
      edges1: null,
      edges2: null,
      edges3: null,
      // maxTime: 0,
      rows: [],
      maxWidth: 720,
      innerWidth: 0,
      immunity: 0.6
    }
  },
  computed: {
    maxTime () {
      return Math.max(...this.edges2[this.lines - 1].map(edge => edge.config.time))
    },
    r0Labels () {
      const { height, padding, step, progress, innerWidth } = this
      return [{
        text: 'R₀=2',
        x: padding * 1.35,
        y: padding,
        opacity: step === 1 && progress < 0.9 ? 1 : 0
      }, {
        text: 'R₀=1',
        x: innerWidth - padding * 1.75,
        y: (height - padding * 2) / 5 + padding,
        opacity: step === 1 && progress > 0.3 && progress < 0.9 ? 1 : 0
      }, {
        text: 'R₀=3',
        x: innerWidth / 2 - padding * 0.4,
        y: (height - padding * 2) / 5 + (height - padding * 2) / 3.5 + padding,
        opacity: step === 1 && progress > 0.5 && progress < 0.9 ? 1 : 0
      }]
    }
  },
  watch: {
    width () { this.resize() },
    height () { this.resize() },
    step () { this.immunity = 0.6 }
  },
  mounted () {
    const s = (p) => {
      p.setup = () => {
        p.createCanvas(this.width, this.height)

        const { generateReproductions, lines } = this

        this.edges1 = generateReproductions(1, 4)
        this.edges2 = generateReproductions(2, lines)
        this.edges3 = generateReproductions(3, 4)
        // this.maxTime = Math.max(...this.edges2[this.edges2.length - 1].map(edge => edge.config.time))
      }

      p.draw = () => {
        const { innerWidth, padding, width, edges1, edges2, edges3, step, progress, height } = this
        p.translate((width - innerWidth) / 2 + padding, padding)

        p.background(255)
        p.noFill()
        edges2.forEach((line, i) => {
          line.forEach(edge => {
            edge.draw(p)
          })
        })

        if (step === 1 && progress > 0) {
          let alpha = 0
          if (progress > 0.2) {
            alpha = Math.min((progress - 0.2) * 5 * 255, 255)
            if (progress > 0.8) {
              alpha = Math.min((1 - progress) * 5 * 255, 255)
            }
          }
          p.translate((innerWidth - padding * 3), (height - padding * 2) / 5)
          p.stroke(0xE2, 0x29, 0xA2, alpha)
          edges1.forEach((line, i) => {
            line.forEach(edge => {
              edge.draw(p)
            })
          })
          alpha = 0
          if (progress > 0.4) {
            alpha = Math.min((progress - 0.4) * 5 * 255, 255)
            if (progress > 0.8) {
              alpha = Math.min((1 - progress) * 5 * 255, 255)
            }
          }
          p.stroke(0xE2, 0x29, 0xA2, alpha)
          p.translate(-(innerWidth / 2 - padding), (height - padding * 2) / 3.5)
          edges3.forEach((line, i) => {
            line.forEach(edge => {
              edge.draw(p)
            })
          })
        }
      }
    }

    this.sketch = new P5(s, this.$refs.el)
    console.log(this.sketch)
  },
  methods: {
    resize () {
      const { width, height, sketch, calcRows } = this
      calcRows()
      this.innerWidth = Math.min(width, this.maxWidth)
      sketch.resizeCanvas(width, height)
    },
    calcRows () {
      const { height, padding, lines, gapY } = this
      const lineHeight = (height - padding * 2 - gapY * (lines - 1)) / '.'.repeat(lines).split('').map((l, i) => i + 1).reduce((a, b) => a + b, 0)
      let lh = 0
      let y = 0
      const rows = []
      for (let i = 0; i < lines; i++) {
        y += lh
        lh += lineHeight
        rows.push([y, y + lh])
        y += gapY
      }
      this.rows = rows
    },
    generateReproductions (r0, lines) {
      const { gapX, rows } = this
      const edges = []
      for (let row = 0; row < lines; row++) {
        const line = []

        for (let col = 0; col < Math.pow(r0, row + 1); col++) {
          let parent = {
            config: {
              time: 0,
              branchImmunity: 1,
              branchIsolation: 1
            },
            x: 0
          }
          if (row > 0) {
            parent = edges[row - 1][Math.floor(col / r0)]
          }
          const x = gapX * col - (gapX * (Math.pow(r0, row + 1) - 1) / 2)
          const time = parent.config.time + 0.5 + Math.random()
          const immunity = row < 4 ? 1 : Math.random()
          const branchImmunity = Math.min(immunity, parent.config.branchImmunity)
          const branchIsolation = row < 6 ? branchImmunity : parent.config.branchIsolation
          const coords = [parent.x, rows[row][0], x, rows[row][1]]
          line.push({
            x,
            config: {
              time,
              branchImmunity,
              branchIsolation
            },
            draw: (p) => {
              const { step, progress, maxTime } = this
              if (r0 !== 2) {
                p.line(...coords)
                return
              }
              if (step === 0) {
                p.stroke('#EEEEEE')
                p.line(...coords)
                if (progress >= time / maxTime * 0.9) {
                  p.stroke(0xE2, 0x29, 0xA2, (progress - time / maxTime * 0.9) * 2550)
                  p.line(...coords)
                }
              }
              if (step === 1) {
                if (row < 4) {
                  p.stroke(0xE2, 0x29, 0xA2)
                  p.line(...coords)
                } else {
                  p.stroke('#EEEEEE')
                  p.line(...coords)
                  if (progress < 0.2) {
                    p.stroke(0xE2, 0x29, 0xA2, 255 - progress * 5 * 255)
                    p.line(...coords)
                  }
                }
              }
              if (step === 2) {
                if (row < 4) {
                  p.stroke(0xE2, 0x29, 0xA2)
                  p.line(...coords)
                } else {
                  p.stroke('#EEEEEE')
                  p.line(...coords)
                  if (col % Math.pow(4, row - 3) === Math.pow(4, row - 3) - 1) {
                    p.stroke(0xE2, 0x29, 0xA2, progress * 5 * 255)
                    p.line(...coords)
                  }
                }
              }
              if (step === 3) {
                if (row < 4) {
                  p.stroke(0xE2, 0x29, 0xA2)
                  p.line(...coords)
                } else {
                  if (immunity <= this.immunity) {
                    p.stroke('#24D9CA')
                  } else if (branchImmunity <= this.immunity) {
                    // p.stroke('#F6CC1D')
                    p.stroke('#BEBEBE')
                  } else {
                    p.stroke(0xE2, 0x29, 0xA2)
                    // p.stroke('#EEEEEE')
                  }
                  p.line(...coords)
                }
              }
              if (step === 4) {
                if (row < 4) {
                  p.stroke(0xE2, 0x29, 0xA2)
                  p.line(...coords)
                } else if (row < 6) {
                  if (immunity <= this.immunity) {
                    p.stroke('#24D9CA')
                  } else if (branchImmunity <= this.immunity) {
                    p.stroke('#BEBEBE')
                  } else {
                    p.stroke(0xE2, 0x29, 0xA2)
                  }
                  p.line(...coords)
                } else {
                  if (branchIsolation <= this.immunity) {
                    p.stroke('#EEEEEE')
                  } else {
                    p.stroke(0xE2, 0x29, 0xA2)
                  }
                  p.line(...coords)
                }
              }
            }
          })
        }
        edges.push(line)
      }
      return edges
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/style/global";
.vis-reproduction {
  position: relative;
  width: 100%;
  .text-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .rO-labels {
      max-width: $max-width;
      width: 100%;
      font-size: 0.8rem;
      color: $color-accent;
      line-height: 1.25;
      span {
        padding-left: $spacing / 8;
        position: absolute;
        transition: opacity $transition;
      }
    }
    .slider {
      max-width: $max-width;
      width: 100%;
      font-size: 0.8rem;
      display: flex;
      flex-direction: column;
      height: 100vh;
      justify-content: flex-start;
      align-items: flex-end;
      padding: $spacing * 1.5 0;
      .blur {
        width: 100%;
        max-width: 400px;
        align-self: flex-end;
        padding: $spacing / 2;

        .label {
          display: flex;
          justify-content: space-between;
          color: $color-green;
          margin-bottom: $spacing / 8;
        }
      }
    }
  }
  > canvas {
    display: block;
  }
}
</style>
