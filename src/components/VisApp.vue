<template>
  <div class="vis-app">
    <div class="text-layer" :style="{width: `${size}px`, height: `${size}px`}">
      <transition name="fade">
        <div v-if="step + progress >= 2" class="actor" :class="{traced}" :style="{transform: `rotate(120deg) translateY(${-orbitOuter}px) rotate(-120deg) translateY(50%) translateY(${actor.r * 2.5}px)`}">
          <strong>id</strong> |<strong> min</strong><br>
          #A |<span v-html="`&nbsp;`"/> 20<br>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step + progress >= 3" class="actor" :style="{transform: `rotate(240deg) translateY(${-orbitOuter}px) rotate(-240deg) translateY(50%) translateY(${actor.r * 2.5}px)`}">
          <strong>id</strong> |<strong> min</strong><br>
          #A | <span v-html="`&nbsp;`"/> 1<br>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="step + progress >= 2" class="actor primary" :class="{infected}"
          :style="{transform: `rotate(${rotation}deg) translateY(${-orbitInner}px) rotate(-${rotation}deg) translateY(-50%) translateY(${-actor.r * 2.5}px)`}
          ">
          <strong>id</strong> |<strong> min</strong><br>
          #B |<span v-html="`&nbsp;`"/> 20<br>
          <template v-if="step + progress >= 3">
          #C | <span v-html="`&nbsp;`"/> 1<br>
          </template>
        </div>
      </transition>
    </div>
    <svg :width="size" :height="size">
      <defs>
        <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="50%" id="gradient-green">
          <stop stop-opacity="0" offset="0%"/>
          <stop stop-opacity="0" offset="50%"/>
          <stop stop-opacity="0.3" offset="100%"/>
        </radialGradient>
        <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="50%" id="gradient-purple">
          <stop stop-opacity="0" offset="0%"/>
          <stop stop-opacity="0" offset="50%"/>
          <stop stop-opacity="0.3" offset="100%"/>
        </radialGradient>
        <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="50%" id="gradient-accent">
          <stop stop-opacity="0" offset="0%"/>
          <stop stop-opacity="0" offset="50%"/>
          <stop stop-opacity="0.3" offset="100%"/>
        </radialGradient>
        <radialGradient cx="50%" cy="50%" fx="50%" fy="50%" r="50%" id="gradient-orange">
          <stop stop-opacity="0" offset="0%"/>
          <stop stop-opacity="0" offset="50%"/>
          <stop stop-opacity="0.3" offset="100%"/>
        </radialGradient>
      </defs>
      <g :transform="`translate(${size / 2} ${size / 2})`">
        <transition name="fade">
          <circle v-if="!infected" class="orbit" :r="orbitInner"/>
        </transition>
        <g class="paths">
          <transition-group name="fade" tag="g">
            <path v-if="step + progress >= 4.3 && step + progress < 4.9" key="arc1" class="infected" :d="`M 0 ${-orbitInner} A ${orbitInner} ${orbitInner} 0 0 1 ${Math.sin(Math.PI / 3 * 2) * orbitInner} ${Math.cos(Math.PI / 3 * 2) * orbitInner}`"/>
            <path v-if="step + progress >= 4.5 && step + progress < 4.9" key="arc2" class="infected" :d="`M 0 ${-orbitInner} A ${orbitInner} ${orbitInner} 0 0 0 ${Math.sin(Math.PI / 3 * 2) * orbitInner} ${Math.cos(Math.PI / 3 * 2) * orbitInner}`"/>
            <path v-if="step + progress >= 4.7" key="arc3" class="infected" :d="`M 0 ${-orbitInner} A ${orbitInner} ${orbitInner} 0 0 0 0 0`"/>
            <path v-if="step + progress >= 4.9" key="arc4" class="infected" :d="`M 0 0 A ${orbitOuter} ${orbitOuter} 0 0 1 ${Math.sin(Math.PI / 3) * orbitOuter} ${Math.cos(Math.PI / 3) * orbitOuter}`"/>
            <path v-if="step + progress >= 4.9" key="arc5" class="infected" :d="`M 0 0 A ${orbitOuter} ${orbitOuter} 0 0 0 ${-Math.sin(Math.PI / 3) * orbitOuter} ${Math.cos(Math.PI / 3) * orbitOuter}`"/>
            <path v-if="step + progress >= 5" key="arc6" class="traced" :d="`M ${Math.sin(Math.PI / 3 * 2) * orbitInner} ${Math.cos(Math.PI / 3 * 2) * orbitInner} A ${orbitOuter} ${orbitOuter} 0 0 1 ${Math.sin(Math.PI / 3) * orbitOuter} ${Math.cos(Math.PI / 3) * orbitOuter}`"/>
          </transition-group>
        </g>
        <g class="actors">
          <g class="actor" :transform="`rotate(${rotation}) translate(0 ${-orbitInner})`">
            <circle class="primary gradient" :class="{infected}" :r="actor.r"/>
            <circle class="primary gradient" :class="{infected}" :r="actor.r"/>
            <circle class="primary" :class="{infected}" :r="actor.r"/>
            <transition name="fade">
              <circle v-if="infected" class="isolation infected" :r="actor.r * 2"/>
            </transition>
            <g :transform="`rotate(${-rotation})`">
              <text y="5">A</text>
            </g>
          </g>
          <g class="actor" :transform="`rotate(120) translate(0 ${-orbitOuter})`">
            <circle class="gradient" :class="{traced}" :r="actor.r" />
            <circle class="gradient" :class="{traced}" :r="actor.r" />
            <circle :r="actor.r" :class="{traced}"/>
            <transition name="fade">
              <circle v-if="traced" class="isolation traced" :r="actor.r * 2"/>
            </transition>
            <g transform="rotate(-120)">
              <text y="5">B</text>
            </g>
          </g>
          <g class="actor" :transform="`rotate(240) translate(0 ${-orbitOuter})`">
            <circle class="gradient" :r="actor.r" />
            <circle class="gradient" :r="actor.r" />
            <circle :r="actor.r"/>
            <g transform="rotate(-240)">
              <text y="5">C</text>
            </g>
          </g>
          <transition name="fade">
            <g v-if="step + progress >= 4.2" class="actor medic" :transform="`rotate(60) translate(0 ${-orbitInner})`">
              <circle :r="actor.r"/>
              <g transform="rotate(-60)">
                <text y="9">+</text>
              </g>
            </g>
          </transition>
          <transition name="fade">
            <g v-if="step + progress >= 4.7" class="actor server">
              <circle :r="actor.r"/>
              <g>
                <text y="7.5">⇄</text>
              </g>
            </g>
          </transition>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'vis-app',
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
      maxWidth: 512,
      spacing: 32,
      actor: {
        r: 16
      }
    }
  },
  computed: {
    size () {
      const { width, maxWidth, height, spacing } = this
      return Math.min(width - spacing * 2, maxWidth, height - spacing * 2)
    },
    orbitOuter () {
      const { size } = this
      return size / 2
    },
    orbitInner () {
      const { orbitOuter, actor } = this
      return orbitOuter - actor.r * 3
    },
    rotation () {
      const { step, progress } = this
      if (step < 1) return 0
      if (step < 4) return (step - 1 + progress) * 120
      return 0
    },
    infected () {
      const { step, progress } = this
      return step + progress >= 4
    },
    traced () {
      const { step, progress } = this
      return step + progress >= 5
    }
  },
  watch: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
@import "@/assets/style/global";
.vis-app {
  .text-layer {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    .actor {
      font-size: 0.8rem;
      position: absolute;
      font-family: "Plex Mono", monospace;
      padding: $spacing / 8 $spacing / 4;

      background: transparentize($color-green, 0.8);
      color: $color-green;
      &.primary {
        background: transparentize($color-purple, 0.8);
        color: $color-purple;
      }
      &.infected {
        background: transparentize($color-accent, 0.8);
        color: $color-accent;
      }
      &.traced {
        background: transparentize($color-orange, 0.8);
        color: $color-orange;
      }
    }
  }
  svg {
    overflow: visible;
    #gradient-green {
      stop {
        stop-color: $color-green;
      }
    }
    #gradient-purple {
      stop {
        stop-color: $color-purple;
      }
    }
    #gradient-accent {
      stop {
        stop-color: $color-accent;
      }
    }
    #gradient-orange {
      stop {
        stop-color: $color-orange;
      }
    }
    circle {
      &.orbit {
        fill: none;
        stroke: transparentize($color-purple, 0.8);
        stroke-width: 2;
      }
    }
    .paths {
      path {
        fill: none;
        stroke-width: 2;
        &.infected {
          stroke: transparentize($color-accent, 0.8);
        }
        &.traced {
          stroke: transparentize($color-orange, 0.8);
        }
      }
    }
    .actors {
      .actor {
        circle {
          fill: $color-green;

          &.gradient {
            fill: url(#gradient-green);
            animation: broadcast 4s linear 0s infinite;

            &:first-child {
              animation-delay: 2s;
            }
          }

          &.primary {
            fill: $color-purple;
            &.gradient {
              fill: url(#gradient-purple);
            }
          }
          &.infected {
            fill: $color-accent;
            &.gradient {
              fill: url(#gradient-accent);
              // animation-name: broadcast-isolation;
            }
          }
          &.traced {
            fill: $color-orange;
            &.gradient {
              fill: url(#gradient-orange);
              // animation-name: broadcast-isolation;
            }
          }
          &.isolation {
            fill: none;
            stroke-width: 2;
            &.infected {
              stroke: transparentize($color-accent, 0.8);
            }
            &.traced {
              stroke: transparentize($color-orange, 0.8);
            }
          }
        }
        text {
          font-size: 1rem;
          fill: $color-white;
          text-anchor: middle;
          font-weight: bold;
        }
        &.medic {
          circle {
            fill: lighten($color-red, 45)
          }
          text {
            fill: $color-red;
            font-size: 1.5rem;
          }
        }
        &.server {
          circle {
            fill: #eeeeee;
          }
          text {
            fill: $color-black;
            font-weight: normal;
            font-size: 1.1rem;
          }
        }
      }
    }
  }

  @keyframes broadcast {
    from {
      opacity: 1;
      transform: scale(1);
    }

    to {
      opacity: 0;
      transform: scale(4);
    }
  }
  @keyframes broadcast-isolation {
    from {
      opacity: 1;
      transform: scale(1);
    }

    33% {
      transform: scale(2);
    }

    to {
      opacity: 0;
      transform: scale(2);
    }
  }
}
</style>
