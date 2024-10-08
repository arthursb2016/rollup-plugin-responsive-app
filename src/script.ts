import queries from './queries'
import { Options } from './types'

export default (mobileQueries: string | null) => {
  return `
    if (typeof window !== 'undefined') {
      const baseFontSize = 16
    
      const updateHtmlFontSize = function() {
        const htmlElement = document.querySelector('html');
        htmlElement.style.removeProperty('font-size');
        const browserFontSize = window.getComputedStyle(htmlElement).getPropertyValue('font-size');

        const browserDifference = Number(browserFontSize.replace('px', '')) - baseFontSize;

        const vRem = window.getComputedStyle(document.documentElement).getPropertyValue('--v-rem');
        const fontSize = Number(vRem) + Number(browserDifference)
        htmlElement.style.setProperty('font-size', fontSize + 'px')
      }

      const addVirtualRemQueries = function() {
        const style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.setAttribute('data-responsive-app', 'true')
        style.textContent = \"${queries.replace(/\n/g, '')}\"
        document.head.appendChild(style)
      }

      const addMobileCentralization = function() {
        if ('${mobileQueries}' === 'null') return
        const style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.setAttribute('data-responsive-app-mobile', 'true')
        style.textContent = \"${mobileQueries!.replace(/\n/g, '')}\"
        document.head.appendChild(style)
      }

      const initResponsive = function() {
        window.addEventListener('resize', updateHtmlFontSize)
        addVirtualRemQueries()
        addMobileCentralization()
        updateHtmlFontSize()
      }

      if (window.document.readyState !== 'loading') {
        initResponsive();
      } else {
        window.document.addEventListener('DOMContentLoaded', function() {
          initResponsive();
        });
      }
    }`
}