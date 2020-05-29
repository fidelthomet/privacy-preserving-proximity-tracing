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
  a {
    hyphens: none;
    color: $color-black;
    &:visited {
      color: $color-black;
    }
    &:hover {
      color: $color-accent;
    }
  }
  span {
    &.sub {
      font-feature-settings: "subs";
    }
    font-style: inherit;
    &.highlight {
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
      white-space: nowrap;
      font-style: italic;
      // font-weight: bold;
      display: inline-block;
      padding: 0 0.5rem 0 0.25rem;
      // border-radius: 0.7em;
      // line-height: 1.4;
      // background: transparentize($color-pink, 0.8);
      // color: darken($color-pink, 10);
      @include tint(color);
      // @include tint-light(background);
      padding: 0 0.1rem 0 0.1rem;
      transition: color $transition, background $transition;
      text-transform: capitalize;
      &.a {
        color: var(--actor-a);
        // background: var(--actor-a-light);
      }
      &.b {
        color: var(--actor-b);
        // background: var(--actor-b-light);
      }
      &.c {
        color: var(--actor-c);
        // background: var(--actor-c-light);
      }
      &.e {
        color: var(--actor-e);
        // background: var(--actor-e-light);
      }
      &.m {
        color: var(--actor-m);
        // background: var(--actor-m-light);
      }
      &::before {
        font-style: normal;
        content: '●';
        transform: scale(0.9);
        display: inline-block;
        padding-right: 0.1rem;
      }
    }
  }
}
</style>
