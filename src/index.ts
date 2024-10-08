import { OutputOptions, OutputBundle, Plugin } from 'rollup'
import { createFilter } from '@rollup/pluginutils'
import fs from 'fs'
import path from 'path'

import { Options } from './types'
import { optionDefaults } from './options'
import { indexHtmlFile, appEntryPoints } from './constants'
import handleCss from './cssHandler'
import handleJs from './jsHandler'

let hasAddedScript = false
const transformedCssFiles = new Set<string>()

export default function(data?: Options): Plugin {
  const options: Options = {
    ...optionDefaults,
    ...(data || {})
  }

  return {
    name: 'responsive-app-rollup-plugin',

    transform: {
      order: 'post',
      handler(code: string, id: string) {
        if ((options.handleMobile || options.transformPixels) && id.includes('.css') && !transformedCssFiles.has(id)) {
          transformedCssFiles.add(id)
          return handleCss(options, code, id)
        }

        const isOptionEntryPoint = options.appEntry && id.includes(options.appEntry)
        const isDefaultEntryPoint = !options.appEntry && appEntryPoints.some(i => id.includes(i)) && !id.includes('/server')

        if (!hasAddedScript && (isOptionEntryPoint || isDefaultEntryPoint)) {
          hasAddedScript = true
          return handleJs(options, code, id)
        }

        return null
      },
    },

    async generateBundle(bundleOptions: OutputOptions, bundle: OutputBundle) {
      const cssFilter = createFilter('**/*.css')

      for (const id of Object.keys(bundle)) {
        if (cssFilter(id)) {
          const cssAsset = bundle[id]
          if (cssAsset && cssAsset.type === 'asset' && !transformedCssFiles.has(id)) {
            const cssBuffer = cssAsset.source;
            const cssContent = typeof cssBuffer === 'string' ? cssBuffer : (Buffer.from(cssBuffer)).toString()
            const transformedCSS = handleCss(options, cssContent, id)
            if (transformedCSS) {
              transformedCssFiles.add(id)
              cssAsset.source = transformedCSS.code
            }
          }
        }
      }
    },

    watchChange(id: string) {
      if (id.endsWith('.css')) {
        this.addWatchFile(id)
      }
    }
  }
}