import {variants} from '@rose-pine/palette'
import prettier from 'prettier'
import fs from 'fs'
import {minify} from 'csso'
import {colorExtractor} from './extractor.mjs'

const TEMPLATE_KEY = '{{template}}'
const STYLE_VARIABLE_PREFIX = 'rose-'
const styleSheetTemplate = `
    :root{
        ${TEMPLATE_KEY}
    }
`

let styleSheet = ``

const pathToCSSVariable = (path) => {
  return `--${path}`
}

const varToStyleString = (variable, value) => {
  return `${variable}:${value};`
}

const appendToStylesheet = (cssString) => {
  if (!styleSheet) {
    styleSheet = styleSheetTemplate
  }
  return styleSheet.replace(
    new RegExp(TEMPLATE_KEY),
    `${cssString}\n{{template}}`
  )
}

const purgeTemplate = (template) => {
  return template.replace(new RegExp(TEMPLATE_KEY), '')
}

function main() {
  const _variants = colorExtractor(variants)
  _variants.forEach((variant) => {
    const colorPath = `${STYLE_VARIABLE_PREFIX}${variant.path}`
    const cssVarName = pathToCSSVariable(colorPath)
    const cssVarString = varToStyleString(cssVarName, variant.color)
    styleSheet = appendToStylesheet(cssVarString)
  })

  styleSheet = purgeTemplate(styleSheet)
  const cleanedStyles = prettier.format(styleSheet, {parser: 'css'})

  fs.writeFileSync('dist/rose-pine.css', cleanedStyles)
  fs.writeFileSync('dist/rose-pine.min.css', minify(cleanedStyles).css)
}

main()
