'use strict';

var MagicString = require('magic-string');

const optionDefaults = {
    appEntry: undefined,
    handleMobile: true,
    transformPixels: false
};
const handleMobileDefaults = {
    ignoreSelectors: [],
    centralizeText: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
    breakpoint: '480px'
};
const transformPixelsDefault = {
    ignoreAttributes: [],
    ignoreSelectors: []
};

const htmlTagBaseFontSize = 16;
const ignoreResponsiveAppClass = 'ignore-responsive-app';
const indexHtmlFile = '/index.html';
const appEntryPoints = [indexHtmlFile, '/app.js', '/main.js', 'src/index.js'];

const cssSelectorRegExp = /([.#\w\-\s,:]+)\s*\{([^}]+?)\}/gs;
const propRegex = /([\w-]+)\s*:\s*([^}]+)/g;
function getRemValue(value) {
    return (value / htmlTagBaseFontSize).toFixed(4).replace(/[.,]0+$/, "");
}
function getPropertyRemValue(value) {
    return value.replace(/[0-9]+px/g, (match) => {
        return getRemValue(Number(match.replace('px', ''))) + 'rem';
    });
}
function transformPixels(code, options) {
    const cssMap = new Map();
    let match;
    while ((match = cssSelectorRegExp.exec(code)) !== null) {
        const selector = match[1].trim();
        const properties = match[2].trim();
        if (options.ignoreSelectors.some(i => selector.includes(i))) {
            continue;
        }
        const pxProperties = [];
        let propMatch;
        while ((propMatch = propRegex.exec(properties)) !== null) {
            const key = propMatch[1].trim();
            const value = propMatch[2].trim();
            if (value.includes('px') && !options.ignoreAttributes.includes(key)) {
                pxProperties.push({ key, value });
            }
        }
        if (pxProperties.length > 0) {
            cssMap.set(selector, pxProperties);
        }
    }
    let transformationDefinitions = '';
    if (cssMap.size > 0) {
        cssMap.forEach((properties, key) => {
            transformationDefinitions += `${key}:not(.${ignoreResponsiveAppClass}){`;
            properties.forEach((prop, index) => {
                const isLast = index === properties.length - 1;
                transformationDefinitions += `${prop.key}:${getPropertyRemValue(prop.value)}${isLast ? '' : ''}`;
            });
            transformationDefinitions += '}';
        });
    }
    return transformationDefinitions;
}
function handleMobile(code, options) {
    const selectors = new Set();
    let match;
    while ((match = cssSelectorRegExp.exec(code)) !== null) {
        const selector = match[1].trim();
        const properties = match[2].trim();
        if (options.ignoreSelectors.some(i => selector.includes(i))) {
            continue;
        }
        let hasDisplayFlex = false;
        let hasFlexDirectionColumn = false;
        let propMatch;
        while ((propMatch = propRegex.exec(properties)) !== null) {
            const key = propMatch[1].trim();
            const value = propMatch[2].trim();
            if (key === 'display' && value === 'flex') {
                hasDisplayFlex = true;
            }
            if (key === 'flex-direction' && value === 'column') {
                hasFlexDirectionColumn = true;
            }
        }
        if (hasDisplayFlex && !hasFlexDirectionColumn) {
            selectors.add(selector);
        }
    }
    let transformationDefinitions = '';
    if (selectors.size > 0) {
        transformationDefinitions = `@media only screen and (max-width: ${options.breakpoint}) and (orientation: portrait){`;
        selectors.forEach((key) => {
            transformationDefinitions += `${key}:not(.${ignoreResponsiveAppClass}){flex-direction: column; margin-left: 0; margin-right: 0}`;
        });
        transformationDefinitions += '}';
    }
    return transformationDefinitions;
}
function findInsertionIndex(str) {
    const openingQuoteStatements = [
        'const __vite__css = "',
        'export default "'
    ];
    let closingQuoteIndex = -1;
    let searchString;
    let startIndex;
    do {
        searchString = openingQuoteStatements.pop();
        startIndex = searchString ? str.indexOf(searchString) : -1;
        if (searchString && startIndex !== -1) {
            const openQuoteIndex = startIndex + searchString.length - 1;
            closingQuoteIndex = str.indexOf('"', openQuoteIndex + 1);
        }
    } while (searchString && startIndex === -1);
    return closingQuoteIndex;
}
var handleCss = (options, code, id) => {
    const transformPixelsParams = {
        ...transformPixelsDefault,
        ...(typeof options.transformPixels === 'object' ? options.transformPixels : {})
    };
    const handleMobileParams = {
        ...handleMobileDefaults,
        ...(typeof options.handleMobile === 'object' ? options.handleMobile : {})
    };
    let transformedCode = '';
    transformedCode += options.transformPixels ? transformPixels(code, transformPixelsParams) : '';
    transformedCode += options.handleMobile ? handleMobile(code, handleMobileParams) : '';
    if (transformedCode) {
        const magicString = new MagicString(code);
        const index = findInsertionIndex(code);
        if (index !== -1) {
            magicString.prependLeft(index, transformedCode);
        }
        else if (code.charAt(code.length - 1) === '"') {
            magicString.replace(/"$/, `${transformedCode}"`);
        }
        else {
            magicString.append(transformedCode);
        }
        return {
            code: magicString.toString(),
            map: magicString.generateMap({
                source: id,
                file: id,
                includeContent: true
            })
        };
    }
    return null;
};

var queries = `
:root {
  --v-rem: 32;
}
@media (orientation: landscape) and (max-width: 2480px), (orientation: landscape) and (max-height: 1395px) {
  :root {
    --v-rem: 31;
 }
}
@media (orientation: landscape) and (max-width: 2400px), (orientation: landscape) and (max-height: 1350px) {
  :root {
    --v-rem: 30;
 }
}
@media (orientation: landscape) and (max-width: 2320px), (orientation: landscape) and (max-height: 1305px) {
  :root {
    --v-rem: 29;
 }
}
@media (orientation: landscape) and (max-width: 2240px), (orientation: landscape) and (max-height: 1260px) {
  :root {
    --v-rem: 28;
 }
}
@media (orientation: landscape) and (max-width: 2160px), (orientation: landscape) and (max-height: 1215px) {
  :root {
    --v-rem: 27;
 }
}
@media (orientation: landscape) and (max-width: 2080px), (orientation: landscape) and (max-height: 1170px) {
  :root {
    --v-rem: 26;
 }
}
@media (orientation: landscape) and (max-width: 2000px), (orientation: landscape) and (max-height: 1125px) {
  :root {
    --v-rem: 25;
 }
}
@media (orientation: landscape) and (max-width: 1920px), (orientation: landscape) and (max-height: 1080px) {
  :root {
    --v-rem: 24;
 }
}
@media (orientation: landscape) and (max-width: 1840px), (orientation: landscape) and (max-height: 1035px) {
  :root {
    --v-rem: 23;
 }
}
@media (orientation: landscape) and (max-width: 1760px), (orientation: landscape) and (max-height: 990px) {
  :root {
    --v-rem: 22;
 }
}
@media (orientation: landscape) and (max-width: 1680px), (orientation: landscape) and (max-height: 945px) {
  :root {
    --v-rem: 21;
 }
}
@media (orientation: landscape) and (max-width: 1600px), (orientation: landscape) and (max-height: 900px) {
  :root {
    --v-rem: 20;
 }
}
@media (orientation: landscape) and (max-width: 1520px), (orientation: landscape) and (max-height: 855px) {
  :root {
    --v-rem: 19;
 }
}
@media (orientation: landscape) and (max-width: 1440px), (orientation: landscape) and (max-height: 810px) {
  :root {
    --v-rem: 18;
 }
}
@media (orientation: landscape) and (max-width: 1360px), (orientation: landscape) and (max-height: 765px) {
  :root {
    --v-rem: 17;
 }
}
@media (orientation: landscape) and (max-width: 1280px), (orientation: landscape) and (max-height: 720px) {
  :root {
    --v-rem: 16;
 }
}
@media (orientation: landscape) and (max-width: 1200px), (orientation: landscape) and (max-height: 675px) {
  :root {
    --v-rem: 15;
 }
}
@media (orientation: landscape) and (max-width: 1120px), (orientation: landscape) and (max-height: 630px) {
  :root {
    --v-rem: 14;
 }
}
@media (orientation: landscape) and (max-width: 1040px), (orientation: landscape) and (max-height: 585px) {
  :root {
    --v-rem: 13;
 }
}
@media (orientation: landscape) and (max-width: 960px), (orientation: landscape) and (max-height: 540px) {
  :root {
    --v-rem: 12;
 }
}
@media (orientation: landscape) and (max-width: 880px), (orientation: landscape) and (max-height: 495px) {
  :root {
    --v-rem: 11;
 }
}
@media (orientation: landscape) and (max-width: 800px), (orientation: landscape) and (max-height: 450px) {
  :root {
    --v-rem: 10;
 }
}
@media (orientation: landscape) and (max-width: 720px), (orientation: landscape) and (max-height: 405px) {
  :root {
    --v-rem: 9;
 }
}
@media (orientation: landscape) and (max-width: 640px), (orientation: landscape) and (max-height: 360px) {
  :root {
    --v-rem: 8;
 }
}
@media (orientation: landscape) and (max-width: 560px), (orientation: landscape) and (max-height: 315px) {
  :root {
    --v-rem: 7;
 }
}
@media (orientation: landscape) and (max-width: 480px), (orientation: landscape) and (max-height: 270px) {
  :root {
    --v-rem: 6;
 }
}
@media (orientation: landscape) and (max-width: 400px), (orientation: landscape) and (max-height: 225px) {
  :root {
    --v-rem: 5;
 }
}
@media (orientation: landscape) and (max-width: 320px), (orientation: landscape) and (max-height: 180px) {
  :root {
    --v-rem: 4;
 }
}
@media (orientation: landscape) and (max-width: 240px), (orientation: landscape) and (max-height: 135px) {
  :root {
    --v-rem: 3;
 }
}
@media (orientation: landscape) and (max-width: 160px), (orientation: landscape) and (max-height: 90px) {
  :root {
    --v-rem: 2;
 }
}
@media (orientation: landscape) and (max-width: 80px), (orientation: landscape) and (max-height: 45px) {
  :root {
    --v-rem: 1;
 }
}
@media (orientation: portrait) and (max-width: 1395px), (orientation: portrait) and (max-height: 2480px) {
  :root {
    --v-rem: 31;
 }
}
@media (orientation: portrait) and (max-width: 1350px), (orientation: portrait) and (max-height: 2400px) {
  :root {
    --v-rem: 30;
 }
}
@media (orientation: portrait) and (max-width: 1305px), (orientation: portrait) and (max-height: 2320px) {
  :root {
    --v-rem: 29;
 }
}
@media (orientation: portrait) and (max-width: 1260px), (orientation: portrait) and (max-height: 2240px) {
  :root {
    --v-rem: 28;
 }
}
@media (orientation: portrait) and (max-width: 1215px), (orientation: portrait) and (max-height: 2160px) {
  :root {
    --v-rem: 27;
 }
}
@media (orientation: portrait) and (max-width: 1170px), (orientation: portrait) and (max-height: 2080px) {
  :root {
    --v-rem: 26;
 }
}
@media (orientation: portrait) and (max-width: 1125px), (orientation: portrait) and (max-height: 2000px) {
  :root {
    --v-rem: 25;
 }
}
@media (orientation: portrait) and (max-width: 1080px), (orientation: portrait) and (max-height: 1920px) {
  :root {
    --v-rem: 24;
 }
}
@media (orientation: portrait) and (max-width: 1035px), (orientation: portrait) and (max-height: 1840px) {
  :root {
    --v-rem: 23;
 }
}
@media (orientation: portrait) and (max-width: 990px), (orientation: portrait) and (max-height: 1760px) {
  :root {
    --v-rem: 22;
 }
}
@media (orientation: portrait) and (max-width: 945px), (orientation: portrait) and (max-height: 1680px) {
  :root {
    --v-rem: 21;
 }
}
@media (orientation: portrait) and (max-width: 900px), (orientation: portrait) and (max-height: 1600px) {
  :root {
    --v-rem: 20;
 }
}
@media (orientation: portrait) and (max-width: 855px), (orientation: portrait) and (max-height: 1520px) {
  :root {
    --v-rem: 19;
 }
}
@media (orientation: portrait) and (max-width: 810px), (orientation: portrait) and (max-height: 1440px) {
  :root {
    --v-rem: 18;
 }
}
@media (orientation: portrait) and (max-width: 765px), (orientation: portrait) and (max-height: 1360px) {
  :root {
    --v-rem: 17;
 }
}
@media (orientation: portrait) and (max-width: 720px), (orientation: portrait) and (max-height: 1280px) {
  :root {
    --v-rem: 16;
 }
}
@media (orientation: portrait) and (max-width: 675px), (orientation: portrait) and (max-height: 1200px) {
  :root {
    --v-rem: 15;
 }
}
@media (orientation: portrait) and (max-width: 630px), (orientation: portrait) and (max-height: 1120px) {
  :root {
    --v-rem: 14;
 }
}
@media (orientation: portrait) and (max-width: 585px), (orientation: portrait) and (max-height: 1040px) {
  :root {
    --v-rem: 13;
 }
}
@media (orientation: portrait) and (max-width: 540px), (orientation: portrait) and (max-height: 960px) {
  :root {
    --v-rem: 12;
 }
}
@media (orientation: portrait) and (max-width: 495px), (orientation: portrait) and (max-height: 880px) {
  :root {
    --v-rem: 11;
 }
}
@media (orientation: portrait) and (max-width: 450px), (orientation: portrait) and (max-height: 800px) {
  :root {
    --v-rem: 10;
 }
}
@media (orientation: portrait) and (max-width: 405px), (orientation: portrait) and (max-height: 720px) {
  :root {
    --v-rem: 9;
 }
}
@media (orientation: portrait) and (max-width: 360px), (orientation: portrait) and (max-height: 640px) {
  :root {
    --v-rem: 8;
 }
}
@media (orientation: portrait) and (max-width: 315px), (orientation: portrait) and (max-height: 560px) {
  :root {
    --v-rem: 7;
 }
}
@media (orientation: portrait) and (max-width: 270px), (orientation: portrait) and (max-height: 480px) {
  :root {
    --v-rem: 6;
 }
}
@media (orientation: portrait) and (max-width: 225px), (orientation: portrait) and (max-height: 400px) {
  :root {
    --v-rem: 5;
 }
}
@media (orientation: portrait) and (max-width: 180px), (orientation: portrait) and (max-height: 320px) {
  :root {
    --v-rem: 4;
 }
}
@media (orientation: portrait) and (max-width: 135px), (orientation: portrait) and (max-height: 240px) {
  :root {
    --v-rem: 3;
 }
}
@media (orientation: portrait) and (max-width: 90px), (orientation: portrait) and (max-height: 160px) {
  :root {
    --v-rem: 2;
 }
}
@media (orientation: portrait) and (max-width: 45px), (orientation: portrait) and (max-height: 80px) {
  :root {
    --v-rem: 1;
 }
}
`;

var getResponsiveScript = () => {
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
        style.setAttribute('data-magic-responsive', 'true')
        style.textContent = \"${queries.replace(/\n/g, '')}\"
        document.head.appendChild(style)
      }

      const initResponsive = function() {
        window.addEventListener('resize', updateHtmlFontSize)
        addVirtualRemQueries()
        updateHtmlFontSize()
      }

      if (window.document.readyState !== 'loading') {
        initResponsive();
      } else {
        window.document.addEventListener('DOMContentLoaded', function() {
          initResponsive();
        });
      }
    }`;
};

var handleJs = (code, id) => {
    const magicString = new MagicString(code);
    const isHtmlFile = id.includes(indexHtmlFile);
    if (isHtmlFile) {
        const index = code.indexOf('</body>');
        magicString.prependLeft(index, `<script>${getResponsiveScript()}</script>`);
    }
    else {
        magicString.append(`\n\n(function() {\n${getResponsiveScript()}\n}())`);
    }
    return {
        code: magicString.toString(),
        map: magicString.generateMap({
            source: id,
            file: id,
            includeContent: true
        })
    };
};

let hasAddedScript = false;
function index (data) {
    const options = {
        ...optionDefaults,
        ...(data || {})
    };
    return {
        name: 'responsive-app-rollup-plugin',
        transform: {
            order: 'post',
            handler(code, id) {
                if ((options.handleMobile || options.transformPixels) && id.includes('.css')) {
                    return handleCss(options, code, id);
                }
                const isOptionEntryPoint = options.appEntry && id.includes(options.appEntry);
                const isDefaultEntryPoint = !options.appEntry && appEntryPoints.some(i => id.includes(i)) && !id.includes('/server');
                if (!hasAddedScript && (isOptionEntryPoint || isDefaultEntryPoint)) {
                    hasAddedScript = true;
                    return handleJs(code, id);
                }
                return null;
            },
        },
    };
}

module.exports = index;
//# sourceMappingURL=index.js.map
