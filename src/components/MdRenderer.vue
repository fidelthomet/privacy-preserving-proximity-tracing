<template>
  <div class="md-renderer">
    <component :is="el" v-html="html"/>
    <portal-target v-if="portal" :name="portal"/>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import { PortalTarget } from 'portal-vue'
const md = new MarkdownIt()
export default {
  name: 'md-renderer',
  components: {
    PortalTarget
  },
  props: {
    text: {
      type: [String, Array],
      default: null
    },
    el: {
      type: String,
      default: 'div'
    },
    portal: {
      type: String,
      default: null
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

  .vue-portal-target {
    margin-bottom: $spacing / 2;
  }
}
</style>
