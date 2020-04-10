/* eslint-disable import/no-webpack-loader-syntax */
import en from '!!raw-loader!./en.md'
import de from '!!raw-loader!./de.md'

const lang = {
  en: {
    text: en,
    name: 'English'
  },
  de: {
    text: de,
    name: 'Deutsch'
  }
}

export const text = Object.fromEntries(Object.keys(lang).map(l => [l, parse(lang[l].text)]))
export const languages = Object.keys(lang).map(l => {
  return {
    name: lang[l].name,
    path: l === 'en' ? '/' : `/${l}`,
    code: l
  }
})

function parse (text) {
  const sections = text.split('+++').filter((d, i) => i > 0).map(t => {
    return [
      t.trim().match(/^[^\s]*/)[0],
      t.trim().replace(/^[^\n]*/, '').trim()
    ]
  })
  const keys = [...new Set(sections.map(s => s[0]))]
  return Object.fromEntries(keys.map(k => {
    return [k, sections.filter(s => s[0] === k).map(s => s[1])]
  }))
}
