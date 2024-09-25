import { Options } from './types'
import { optionDefaults } from './options'
import { indexHtmlFile, appEntryPoints } from './constants'
import handleCss from './cssHandler'
import handleJs from './jsHandler'

let hasAddedScript = false

export default function(data?: Options) {
  const options: Options = {
    ...optionDefaults,
    ...(data || {})
  }

  return {
    name: 'responsive-app-rollup-plugin',

    transform: {
      order: 'post',
      handler(code: string, id: string) {
        if ((options.handleMobile || options.transformPixels) && id.includes('.css')) {
          return handleCss(options, code, id)
        }

        const isOptionEntryPoint = options.appEntry && id.includes(options.appEntry)
        const isDefaultEntryPoint = !options.appEntry && appEntryPoints.some(i => id.includes(i)) && !id.includes('/server')

        if (!hasAddedScript && (isOptionEntryPoint || isDefaultEntryPoint)) {
          hasAddedScript = true
          return handleJs(code, id)
        }

        return null
      },
    },
  }
}