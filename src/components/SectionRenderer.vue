<template>
  <section v-if="texts.length === 1" class="section-renderer" :class="[section]" v-html="texts[0]"/>
  <section v-else class="section-renderer scrolly" :class="[section]">
    <template div v-for="(t, i) in texts">
      <div class="step" :key="`p-${section}-${i}`"/>
      <div class="text blur" :key="`t-${section}-${i}`" v-html="t"/>
    </template>
  </section>
</template>

<script>
import MarkdownIt from 'markdown-it'
import { mapGetters } from 'vuex'
const md = new MarkdownIt()
export default {
  name: 'section-renderer',
  props: {
    section: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters(['getText']),
    texts () {
      return this.getText(this.section).map(t => md.render(t))
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.section-renderer {
  width: 100%;
  max-width: $max-width;

  &.center {
    text-align: center;
  }

  &.scrolly {
    font-size: 0.8em;
    display: flex;
    flex-direction: column;
    align-items: center;

    .step {
      height: 50vh;
      width: 100%;
    }

    .text {
      padding: $spacing / 2;
      max-width: 400px;
      align-self: flex-end;
      pointer-events: all;
    }
  }
}
</style>
