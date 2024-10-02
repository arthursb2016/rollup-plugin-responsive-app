import MagicString from 'magic-string'
import { Options, TransformPixelsOptions, HandleMobileOptions } from './types'
import { htmlTagBaseFontSize, ignoreResponsiveAppClass } from './constants'
import { handleMobileDefaults, transformPixelsDefault } from './options'

const pxToRemRegExp = /(\d+)px/g
const cssSelectorRegExp = /([.#\w\-\s,:]+)\s*\{([^}]+?)\}/gs
const propRegex = /([\w-]+)\s*:\s*([^}]+)/g

function getRemValue(value: number) {
  return (value / htmlTagBaseFontSize).toFixed(4).replace(/[.,]0+$/, "")
}

function getPropertyRemValue(value: string) {
  return value.replace(/[0-9]+px/g, (match: string) => {
    return getRemValue(Number(match.replace('px', ''))) + 'rem'
  })
}

function transformPixels(code: string, options: TransformPixelsOptions) {
  const cssMap = new Map()
  let match

  while ((match = cssSelectorRegExp.exec(code)) !== null) {
    const selector = match[1].trim()
    const properties = match[2].trim()

    if (options.ignoreSelectors.some(i => selector.includes(i))) {
      continue
    }

    const pxProperties = []
    let propMatch

    while ((propMatch = propRegex.exec(properties)) !== null) {
      const key = propMatch[1].trim()
      const value = propMatch[2].trim()

      if (value.includes('px') && !options.ignoreAttributes.includes(key)) {
        pxProperties.push({ key, value })
      }
    }

    if (pxProperties.length > 0) {
      cssMap.set(selector, pxProperties)
    }
  }

  let transformationDefinitions = ''

  if (cssMap.size > 0) {
    cssMap.forEach((properties, key) => {
      transformationDefinitions += `${key}:not(.${ignoreResponsiveAppClass}){`
      properties.forEach((prop: { key: string, value: string }, index: number) => {
        const isLast = index === properties.length - 1
        transformationDefinitions += `${prop.key}:${getPropertyRemValue(prop.value)}${isLast ? '' : ''}`
      })
      transformationDefinitions += '}'
    })
  }

  return transformationDefinitions
}

function handleMobile(code: string, options: HandleMobileOptions) {
  const selectors = new Set()
  let match

  while ((match = cssSelectorRegExp.exec(code)) !== null) {
    const selector = match[1].trim()
    const properties = match[2].trim()
    if (options.ignoreSelectors.some(i => selector.includes(i))) {
      continue
    }
    const propertiesString = properties.replace(/ /g, '')
    const requiresRule = propertiesString.includes('display:flex') && !propertiesString.includes('flex-direction:column')
    if (requiresRule) {
      selectors.add(selector);
    }
  }

  let transformationDefinitions = ''

  if (selectors.size > 0) {
    transformationDefinitions = `@media only screen and (max-width: ${options.breakpoint}) and (orientation: portrait){`
    selectors.forEach((key) => {
      transformationDefinitions += `${key}:not(.${ignoreResponsiveAppClass}){flex-direction: column; margin-left: 0; margin-right: 0}`
    })
    transformationDefinitions += '}'
  }

  return transformationDefinitions
}

function findInsertionIndex(str: string) {
  const openingQuoteStatements = [
    'const __vite__css = "',
    'export default "'
  ]
  let closingQuoteIndex = -1
  let searchString
  let startIndex

  do {
    searchString = openingQuoteStatements.pop()
    startIndex = searchString ? str.indexOf(searchString) : -1
    if (searchString && startIndex !== -1) {
      const openQuoteIndex = startIndex + searchString.length - 1
      closingQuoteIndex = str.indexOf('"', openQuoteIndex + 1)
    }
  } while (searchString && startIndex === -1)

  return closingQuoteIndex
}

export default (options: Options, code: string, id: string) => {
  const transformPixelsParams = {
    ...transformPixelsDefault,
    ...(typeof options.transformPixels === 'object' ? options.transformPixels : {})
  }
  const handleMobileParams = {
    ...handleMobileDefaults,
    ...(typeof options.handleMobile === 'object' ? options.handleMobile : {})
  }

  let transformedCode = ''
  transformedCode += options.transformPixels ? transformPixels(code, transformPixelsParams) : ''
  transformedCode += options.handleMobile ? handleMobile(code, handleMobileParams) : ''

  if (transformedCode) {
    const magicString = new MagicString(code)
    const index = findInsertionIndex(code)
    if (index !== -1) {
      magicString.prependLeft(index, transformedCode)
    } else if (code.charAt(code.length - 1) === '"') {
      magicString.replace(/"$/, `${transformedCode}"`)
    } else {
      magicString.append(transformedCode)
    }

    return {
      code: magicString.toString(),
      map: magicString.generateMap({
        source: id,
        file: id,
        includeContent: true
      })
    }
  }

  return null
}