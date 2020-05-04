<template>
  <div class="md-renderer">
    <component :is="el" v-html="html"/>
    <portal-target v-if="portal" :name="portal"/>
  </div>
</template>

<script>
// import MarkdownIt from 'markdown-it'
// import MarkdownItAttrs from 'markdown-it-attrs'
// import MarkdownItBracketedSpans from 'markdown-it-bracketed-spans'
import marked from 'marked'
import { sanitize } from 'dompurify'
import { PortalTarget } from 'portal-vue'
// const md = new MarkdownIt()
// md.use(MarkdownItAttrs, {
//   allowedAttributes: ['class']
// })
// md.use(MarkdownItBracketedSpans)
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
      return sanitize(marked(typeof text === 'string' ? text : text.join('\n\n')))
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
<style lang="scss">
@import "@/assets/style/global";
.md-renderer {
  span {
    &.sub {
      font-feature-settings: "subs";
    }
    font-style: inherit;
    &.highlight, &.actor {
      white-space: nowrap;
      font-style: italic;
      display: inline-block;
      padding: 0 0.5rem 0 0.5rem;
      border-radius: 0.7em;
      line-height: 1.4;
      background: transparentize($color-pink, 0.8);
      color: darken($color-pink, 10);
      @include tint(color);
      @include tint-light(background);
    }
    &.actor {
      padding: 0 0.5rem 0 0.25rem;
      transition: color $transition, background $transition;
      &.a {
        color: var(--actor-a);
        background: var(--actor-a-light);
      }
      &.b {
        color: var(--actor-b);
        background: var(--actor-b-light);
      }
      &.c {
        color: var(--actor-c);
        background: var(--actor-c-light);
      }
      &::before {
        font-style: normal;
        content: '● ';
      }
    }
  }
}
</style>
