<template>
  <g class="symbol-timeline multiply" :style="{transform: `translate(${actor.x}px, ${actor.y}px)`}">
    <g class="multiply" :transform="`translate(${actor.size / 4} 0)`">
      <rect :height="actor.size" v-bind="actor.baseline" :rx="actor.size / 2" :y="-actor.size / 4"/>
      <rect :height="actor.size" v-bind="actor.isolation"
        :rx="actor.size / 2" :y="0"
        class="yellow"/>
      <rect :height="actor.size" v-if="actor.tracedIsolation"
        v-bind="actor.tracedIsolation"
        :rx="actor.size / 2" :y="0"
        class="yellow"/>
      <circle v-if="actor.symptoms" :r="actor.size / 2"
        class="accent" v-bind="actor.symptoms"/>
      <circle :r="actor.size / 2" :cx="actor.size / 4" :class="actor.color" :opacity="actor.opacity"/>
    </g>
    <g class="multiply" v-if="actor.children" :transform="`translate(0 ${actor.size * 0.75})`">
      <symbol-timeline v-for="(a, i) in actor.children" :actor="a" :key="`${k}-${i}`" :k="`${k}-${i}`" :level="level + 1" :width="width" :step="step - 1" :progress="progress"/>
    </g>
  </g>
</template>

<script>
export default {
  name: 'symbol-timeline',
  props: {
    width: {
      type: Number,
      default: null
    },
    level: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: null
    },
    progress: {
      type: Number,
      default: null
    },
    actor: {
      type: Object,
      default: null
    },
    k: {
      type: String,
      default: null
    }
  },
  data () {
    return {}
  },
  computed: {
    // size () {
    //   const { level } = this
    //   return 64 / (Math.pow(2, level) / 2)
    // },
    // baseline () {
    //   const { size, width, progress, step } = this
    //   return {
    //     width: step < 1 ? size + (width - size) * progress : width,
    //     opacity: step + progress < 0.1 ? 0 : 1
    //   }
    // }
  },
  watch: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss">
@import "@/assets/style/global";
.symbol-timeline {
  transition: transform $transition;
  rect, circle {
    mix-blend-mode: multiply;
    fill: $color-pale-gray;

    transition: opacity $transition, fill $transition;

    &.accent {
      fill: $color-accent;
    }
    &.purple-light {
      fill: transparentize($color-purple, 0.75);
    }
    &.green {
      fill: $color-green;
    }
    &.yellow {
      fill: $color-yellow;
      // mix-blend-mode: color;
    }
    &.purple {
      fill: $color-purple;
    }
  }
}
.multiply {
  mix-blend-mode: multiply;
}
</style>
