import MagicString from 'magic-string'
import { indexHtmlFile } from './constants'
import getResponsiveScript from './script'

export default (code: string, id: string) => {
  const magicString = new MagicString(code)
  const isHtmlFile = id.includes(indexHtmlFile)
  if (isHtmlFile) {
    const index = code.indexOf('</body>')
    magicString.prependLeft(index, `<script>${getResponsiveScript()}</script>`)
  } else {
    magicString.append(`\n\n(function() {\n${getResponsiveScript()}\n}())`)
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