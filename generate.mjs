import {colorsByVariant} from '@rose-pine/palette'
import prettier from 'prettier'
import fs from 'fs'
import {paramCase} from 'param-case'
import {minify} from 'csso'

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
  const variants = Object.keys(colorsByVariant)
  variants.forEach((variant) => {
    let path = `${STYLE_VARIABLE_PREFIX}${variant}-`
    Object.keys(colorsByVariant[variant]).forEach((colorRole) => {
      const colorRoleText = paramCase(colorRole)
      const localPath = `${path}${colorRoleText}`
      const color = colorsByVariant[variant][colorRole]
      const cssVarName = pathToCSSVariable(localPath)
      const cssVarString = varToStyleString(cssVarName, color)
      styleSheet = appendToStylesheet(cssVarString)
    })
  })

  styleSheet = purgeTemplate(styleSheet)
  const cleanedStyles = prettier.format(styleSheet, {parser: 'css'})

  fs.writeFileSync('dist/rose-pine.css', cleanedStyles)
  fs.writeFileSync('dist/rose-pine.min.css', minify(cleanedStyles).css)
}

main()
