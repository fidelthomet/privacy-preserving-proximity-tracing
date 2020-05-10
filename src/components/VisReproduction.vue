<template>
  <div class="vis-reproduction" ref="el">
    <div class="text-layer">
      <portal to="vis-reproduction-3">
          <div class="slider-label immunity">
            <span>Immunity</span>
            <span>{{Math.round(immunity * 100)}}%</span>
          </div>
          <input type="range" class="green" min="0" max="1" v-model="immunity" step="0.01"/>
      </portal>
      <portal to="vis-reproduction-4">
          <div class="slider-label isolation">
            <span>Isolation</span>
            <span>{{Math.round(isolation * 100)}}%</span>
          </div>
          <input type="range" class="yellow" min="0" max="1" v-model="isolation" step="0.01"/>
      </portal>
      <!-- <div class="rO-labels">
        <span v-for="(l, i) in r0Labels" :key="`l-${i}`"
          :style="{transform: `translate(${l.x}px, ${l.y}px)`, opacity: l.opacity}">
          {{l.text}}
        </span>
      </div> -->
    </div>
  </div>
</template>

<script>
import P5 from 'p5'
import colors from '@/assets/style/global.scss'

import { Portal } from 'portal-vue'
export default {
  name: 'vis-reproduction',
  components: {
    Portal
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
      colors,
      sketch: null,
      lineHeight: 24,
      gapY: 8,
      lines: 8,
      padding: 32,
      gapX: 12,
      qS: 2,
      reproductions: null,
      edges1: null,
      edges2: null,
      edges3: null,
      // maxTime: 0,
      rows: [],
      maxWidth: 720,
      innerWidth: 0,
      immunity: 0.6,
      isolation: 0.6
    }
  },
  computed: {
    maxTime () {
      return Math.max(...this.edges2[this.lines - 1].map(edge => edge.config.time))
    },
    r0Labels () {
      const { padding, step, progress, innerWidth } = this
      return [{
        text: 'R₀=2',
        x: padding * 1.35,
        y: padding,
        opacity: step === 1 && progress < 0.9 ? 1 : 0
      }, {
        text: 'R₀=3',
        x: innerWidth - padding * 1.75,
        y: padding,
        opacity: step === 1 && progress > 0.3 && progress < 0.9 ? 1 : 0
      }, {
        text: 'R₀=1',
        x: innerWidth / 2 - padding * 0.4,
        y: padding,
        opacity: step === 1 && progress > 0.5 && progress < 0.9 ? 1 : 0
      }]
    }
  },
  watch: {
    width () { this.resize() },
    height () { this.resize() },
    progress () { this.redraw() },
    immunity () { this.redraw() },
    isolation () { this.redraw() }
    // step () { this.immunity = 0.6 }
  },
  mounted () {
    const s = (p) => {
      p.setup = () => {
        p.createCanvas(this.width, this.height)

        const { generateReproductions, calcRows, lines } = this
        calcRows()
        this.reproductions = [
          generateReproductions(2, lines),
          generateReproductions(1, lines),
          generateReproductions(3, lines)
        ]
        p.noLoop()
        // this.maxTime = Math.max(...this.edges2[this.edges2.length - 1].map(edge => edge.config.time))
      }

      p.draw = () => {
        const { innerWidth, padding, width, reproductions, colors, step, progress, transparentize } = this
        p.translate((width / 2) - innerWidth + padding * 2, padding)
        p.background(255)
        p.noFill()
        const sp = step + progress
        reproductions.forEach(reproduction => {
          p.translate((innerWidth) / 2 - padding, 0)
          if (reproduction.r0 === 2) {
            reproduction.rows.forEach((row, i) => {
              row.forEach((edge, i2) => {
                switch (step) {
                  case 0:
                    if (progress >= edge.config.time / reproduction.maxTime * 1) {
                      edge.draw(p, colors.pink)
                    }
                    break
                  case 1:
                    edge.draw(p, colors.pink)
                    break
                  case 2:
                    if (i < 4) {
                      edge.draw(p, colors.pink)
                    } else if (i2 % Math.pow(4, i - 3) === Math.pow(4, i - 3) - 1) {
                      edge.draw(p, colors.pink)
                      edge.draw(p, transparentize(colors.pink, progress * 2))
                    } else {
                      edge.draw(p, colors.paleGray)
                      edge.draw(p, transparentize(colors.pink, progress * 2))
                    }
                    break
                  case 3:
                    if (i < 4) {
                      edge.draw(p, colors.pink)
                    } else {
                      if (edge.config.immunity <= this.immunity) {
                        edge.draw(p, colors.green)
                      } else if (edge.config.branchImmunity <= this.immunity) {
                        edge.draw(p, colors.paleGray)
                      } else {
                        edge.draw(p, colors.pink)
                      }
                    }
                    break
                  case 4:
                    if (i < 4) {
                      edge.draw(p, colors.pink)
                    } else if (i < 6) {
                      if (edge.config.immunity <= this.isolation) {
                        edge.draw(p, colors.yellow)
                      } else if (edge.config.branchImmunity <= this.isolation) {
                        edge.draw(p, colors.paleGray)
                      } else {
                        edge.draw(p, colors.pink)
                      }
                    } else {
                      if (edge.config.branchIsolation <= this.isolation) {
                        edge.draw(p, colors.paleGray)
                      } else {
                        edge.draw(p, colors.pink)
                      }
                    }
                    break
                }
              })
            })
          } else if (reproduction.r0 === 1) {
            if (sp < 1 || sp > 2.25) return
            switch (step) {
              case 1:
                reproduction.rows.forEach((row, i) => {
                  row.forEach(edge => {
                    if (progress >= edge.config.time / reproduction.maxTime * 0.5) {
                      edge.draw(p, colors.yellow)
                    }
                  })
                })
                break
              case 2:
                const color = transparentize(colors.yellow, progress * 4)
                reproduction.rows.forEach((row, i) => {
                  row.forEach(edge => {
                    edge.draw(p, color)
                  })
                })
                break
            }
          } else if (reproduction.r0 === 3) {
            if (sp < 1.5 || sp > 2.25) return
            switch (step) {
              case 1:
                reproduction.rows.forEach((row, i) => {
                  row.forEach(edge => {
                    if (progress >= edge.config.time / reproduction.maxTime * 0.5 + 0.5) {
                      edge.draw(p, colors.purple)
                    }
                  })
                })
                break
              case 2:
                const color = transparentize(colors.purple, progress * 4)
                reproduction.rows.forEach((row, i) => {
                  row.forEach(edge => {
                    edge.draw(p, color)
                  })
                })
                break
            }
          }
        })

        // if (step === 1 && progress > 0) {
        //   p.translate((innerWidth - padding * 3), 0)
        //   p.stroke(0xE2, 0x29, 0xA2)
        //   edges1.forEach((line, i) => {
        //     line.forEach(edge => {
        //       edge.draw(p)
        //     })
        //   })
        //   p.stroke(0xE2, 0x29, 0xA2)
        //   p.translate(-(innerWidth / 2 - padding), 0)
        //   edges3.forEach((line, i) => {
        //     line.forEach(edge => {
        //       edge.draw(p)
        //     })
        //   })
        // }
      }
    }

    this.sketch = new P5(s, this.$refs.el)
  },
  methods: {
    resize () {
      const { width, height, sketch, calcRows } = this
      calcRows()
      this.innerWidth = Math.min(width, this.maxWidth)
      sketch.resizeCanvas(width, height)
    },
    redraw () {
      const { sketch } = this
      if (sketch == null) return
      sketch.redraw()
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
    transparentize (color, amount) {
      var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color).filter((v, i) => i > 0).map(v => parseInt(v, 16))
      return [...rgb, 255 - amount * 255]
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
            px: parent.x,
            config: {
              time,
              immunity,
              branchImmunity,
              branchIsolation
            },
            draw: (p, color) => {
              p.stroke(color)
              p.line(...coords)
              // if (step === 4) {
              //   if (row < 4) {
              //     p.stroke(0xE2, 0x29, 0xA2)
              //     p.line(...coords)
              //   } else if (row < 6) {
              //     if (immunity <= this.isolation) {
              //       p.stroke('#F6BC0D')
              //     } else if (branchImmunity <= this.isolation) {
              //       p.stroke('#BEBEBE')
              //     } else {
              //       p.stroke(0xE2, 0x29, 0xA2)
              //     }
              //     p.line(...coords)
              //   } else {
              //     if (branchIsolation <= this.isolation) {
              //       p.stroke('#EEEEEE')
              //     } else {
              //       p.stroke(0xE2, 0x29, 0xA2)
              //     }
              //     p.line(...coords)
              //   }
              // }
            }
          })
        }
        edges.push(line)
      }
      const maxTime = Math.max(...edges[lines - 1].map(edge => edge.config.time))
      // edges.forEach(lines => {
      //   lines.forEach(line => { line.config.maxTime = maxTime })
      // })
      // console.log(edges.map(row => row.filter(edge => edge.px > 2000 || edge.px < -2000 || true).length))
      return {
        rows: edges.map(row => row.filter(edge => edge.px > -2000 && edge.px < 2000)),
        maxTime,
        r0
      }
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
  }
  > canvas {
    display: block;
  }
}
</style>
<style lang="scss">
@import "@/assets/style/global";
.slider-label {
  display: flex;
  justify-content: space-between;
  color: $color-green;
  margin-bottom: $spacing / 8;

  &.isolation {
    color: $color-yellow;
  }
}
</style>
