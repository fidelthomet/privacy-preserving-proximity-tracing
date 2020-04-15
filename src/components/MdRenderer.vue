<template>
  <component :is="el" class="md-renderer" v-html="html"/>
</template>

<script>
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()
export default {
  name: 'md-renderer',
  props: {
    text: {
      type: [String, Array],
      default: null
    },
    el: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    html () {
      const { text } = this
      return md.render(typeof text === 'string' ? text : text.join('\n\n'))
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global";
.md-renderer {
  width: 100%;
  max-width: $max-width;
}
</style>
