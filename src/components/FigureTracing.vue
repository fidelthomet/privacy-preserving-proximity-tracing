<template>
  <div class="vis-app">
    <transition-group name="fade" tag="div" class="text-layer" :style="{width: `${size}px`, height: `${size}px`}">
      <div v-for="text in texts" :key="text.key" class="text" :class="text.class" v-html="text.html" :style="{transform: text.transform}"/>
    </transition-group>
    <svg :width="size" :height="size">
      <g :transform="`translate(${size / 2} ${size / 2})`">
        <transition name="fade">
          <circle v-if="!config.orbit.hide" class="orbit" :class="[config.orbit.color]" :r="orbit"/>
        </transition>
        <g class="paths">
          <transition-group name="fade" tag="g">
            <path v-for="edge in edges" :key="edge.key" v-bind="edge" class="edge" :class="[edge.color, {dashed: edge.dashed, dotted: edge.dotted}]"/>
          </transition-group>
        </g>
        <transition-group name="fade" tag="g" class="actors">
          <g v-for="actor in actors" :key="actor.key" v-bind="actor" class="actor">
            <template v-if="actor.transmitting && !actor.directional">
              <circle class="gradient" :class="[actor.color, {isolated: actor.isolation}]" :r="layout.actor.r * actor.scale"/>
              <circle class="gradient" :class="[actor.color, {isolated: actor.isolation}]" :r="layout.actor.r * actor.scale"/>
            </template>
            <template v-if="actor.transmitting && actor.directional">
              <g :transform="`rotate(${45 + actor.rotate})`">
                <path class="gradient" :class="[actor.color, {isolated: actor.isolation}]" :d="`M${-layout.actor.r * actor.scale},${0} A ${layout.actor.r * actor.scale} ${layout.actor.r * actor.scale} 0 0 1 ${0},${-layout.actor.r * actor.scale} L0,0`"/>
                <path class="gradient" :class="[actor.color, {isolated: actor.isolation}]" :d="`M${-layout.actor.r * actor.scale},${0} A ${layout.actor.r * actor.scale} ${layout.actor.r * actor.scale} 0 0 1 ${0},${-layout.actor.r * actor.scale} L0,0`"/>
              </g>
            </template>
            <circle :class="[actor.color, ...actor.class]" :r="layout.actor.r * actor.scale"/>
            <transition name="fade">
              <circle v-if="actor.isolation" class="isolation" :class="[actor.color]" :r="layout.actor.r * actor.scale * 2"/>
            </transition>
            <g>
              <text y="5" :class="[actor.color, ...actor.class]">{{actor.name}}</text>
            </g>
          </g>
        </transition-group>
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
    },
    config: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      maxWidth: 512,
      spacing: 32,
      layout: {
        actor: {
          r: 16
        }
      }
    }
  },
  computed: {
    size () {
      const { width, maxWidth, height, spacing } = this
      return Math.min(width - spacing * 2, maxWidth, height - spacing * 2)
    },
    orbit () {
      const { size, layout } = this
      return size / 2 - layout.actor.r * 3
    },
    actors () {
      const { config, toXY } = this
      return config.actors.map((a, id) => ({ id, ...a })).filter(a => a.show || (a.show !== false && !a.hide)).map(a => {
        const pos = toXY(a.transform)
        return {
          ...a,
          transform: `translate(${pos.x} ${pos.y})`,
          rotate: 360 * a.transform.rev,
          scale: a.transform.scale != null ? a.transform.scale : 1,
          key: `actor-${a.id}`
        }
      })
    },
    edges () {
      const { config, toXY, orbit } = this
      return config.edges.map((e, id) => ({ id, ...e })).filter(e => e.show || (e.show !== false && !e.hide)).map((e) => {
        const nodes = e.nodes.map(n => config.actors.find(a => a.name === n || a.key === n || a.id === n).transform)
        const p = nodes.map(n => toXY(n))
        const r = orbit * (e.r != null ? e.r : 1)
        return {
          ...e,
          d: `M${p[0].x},${p[0].y} A ${r} ${r} 0 ${e.large ? 1 : 0} ${e.dir ? 1 : 0} ${p[1].x},${p[1].y}`,
          key: `edge-${e.id}`
        }
      })
    },
    texts () {
      const { config, toXY } = this
      return config.actors.map((a, id) => ({ id, ...a })).filter(a => a.text != null && (a.text.show || (a.text.show !== false && !a.text.hide))).map(a => {
        const pos = toXY(a.transform)
        return {
          class: [a.color],
          transform: `translate(${pos.x}px, ${pos.y + a.text.offset}px) translateY(${50 * (a.text.offset / Math.abs(a.text.offset))}%)`,
          html: a.text.html,
          key: `text-${a.id}`
        }
      })
    }
  },
  watch: {},
  mounted () {},
  methods: {
    toXY ({ r = 0, rev = 1, offset = 0 }) {
      const { orbit } = this
      const rotate = (rev - 0.25) * Math.PI * 2
      const radius = r * orbit + offset
      return {
        x: Math.cos(rotate) * radius,
        y: Math.sin(rotate) * radius
      }
    }
  }
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
  }
  svg {
    overflow: visible;
    circle {
      &.orbit {
        fill: none;
        @include tint-light(stroke);
        stroke-width: 2;
      }
    }
    .paths {
      .edge {
        fill: none;
        stroke-width: 2;
        @include tint-light(stroke);
        &.dashed {
          stroke-dasharray: 8 4;
        }
        &.dotted {
          stroke-dasharray: 0 5;
          stroke-width: 2;
          stroke-linecap: round;
        }
      }
    }
    .actors {
      .actor {
        circle, path {
          fill: $color-green;
          transition: fill $transition, stroke $transition, opacity $transition;

          &.gradient {
            // fill: url(#gradient-green);
            animation: broadcast 4s linear 0s infinite;

            &.isolated {
              animation-name: broadcast-isolation;
            }

            &:first-child {
              animation-delay: 2s;
            }
          }

          @include tint(fill);

          &.invert {
            @include tint-light(fill);
          }
          &.isolation {
            fill: none;
            stroke-width: 2;
            @include tint(stroke);
          }
        }
        text {
          font-size: 1rem;
          fill: $color-white;
          text-anchor: middle;
          font-weight: bold;
          transition: fill $transition;
          &.invert {
            @include tint(fill);
          }
        }
      }
    }
  }

  @keyframes broadcast {
    from {
      opacity: 0.8;
      transform: scale(1);
    }

    to {
      opacity: 0;
      transform: scale(4);
    }
  }
  @keyframes broadcast-isolation {
    from {
      opacity: 0.8;
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
<style lang="scss">
@import "@/assets/style/global";
.vis-app {
  .text-layer {
    .text {
      font-size: 0.8rem;
      position: absolute;
      padding: $spacing / 8;
      color: $color-green;
      transition: background $transition, color $transition, opacity $transition;
      @include tint-light(background);
      @include tint(color);

      table {
        border-collapse: collapse;
        td, th {
          padding: 0 $spacing / 8;
          text-align: center;
          border-left: 1px solid;
          @include tint(border-color);
          &:first-of-type {
            // text-align: left;
            border-left: none;
          }
        }
      }
    }
  }
}
</style>
