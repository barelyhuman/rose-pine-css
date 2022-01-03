import {variants} from '@rose-pine/palette'
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
  const _variants = Object.keys(variants)
  _variants.forEach((variant) => {
    const path = `${STYLE_VARIABLE_PREFIX}${variant}-`
    Object.keys(variants[variant]).forEach((colorRole) => {
      const colorRoleText = paramCase(colorRole)
      const localPath = `${path}${colorRoleText}`
      const colorMap = variants[variant][colorRole]
      Object.keys(colorMap).forEach((colorVal) => {
        let colorPath = `${localPath}`
        if (colorVal === 'alpha') {
          return
        }
        if (colorVal !== 'hex') {
          colorPath += `-${colorVal}`
        }
        const cssVarName = pathToCSSVariable(colorPath)
        const cssVarString = varToStyleString(cssVarName, colorMap[colorVal])
        styleSheet = appendToStylesheet(cssVarString)
      })
    })
  })

  styleSheet = purgeTemplate(styleSheet)
  const cleanedStyles = prettier.format(styleSheet, {parser: 'css'})

  fs.writeFileSync('dist/rose-pine.css', cleanedStyles)
  fs.writeFileSync('dist/rose-pine.min.css', minify(cleanedStyles).css)
}

main()
