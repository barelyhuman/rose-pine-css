import {paramCase} from 'param-case'

export function colorExtractor(source, visitedPath = '') {
  if (typeof source === 'string') {
    return {color: source, path: visitedPath}
  }

  let colorMap = []

  Object.keys(source).forEach((key) => {
    let pathKey = paramCase(visitedPath)
    if (key !== 'hex') {
      pathKey += '-' + paramCase(key)
    }
    const val = colorExtractor(source[key], pathKey)
    colorMap = colorMap.concat(val)
  })

  return colorMap
}
