import fs from 'fs'
import path from 'path'

import { parse, compileTemplate, compileScript } from 'vue/compiler-sfc'

/**  
 *
 * @param {String} filePath - 绝对路径
 */
function compile(filePath) {
  const file = fs.readFileSync(path.join(path.resolve(), filePath), 'utf-8')

  const { descriptor } = parse(file)

  const { code: templateCode } = compileTemplate({
    id: filePath,
    source: descriptor.template.content
  })

  const { content: scriptCode } = compileScript(descriptor, {
    id: filePath,
    reactivityTransform: true
  })

  let finallyCode = ''

  if (scriptCode) {
    finallyCode += scriptCode.replace('export default ', 'const script = ')
    if (templateCode) {
      const importStatements =
        templateCode.match(/import .* from .*/g)?.join('\n') || ''
      const renderContent =
        templateCode
          .match(/export function render.*}/s)?.[0]
          .replace('export function', 'function')
          .replace(/\n\s+/g, ' ') || ''
      finallyCode = `${importStatements}\n${finallyCode}\nscript.render = ${renderContent}\n`
      finallyCode += '\nexport default script;'
    }
  }

  const writeFilePath = filePath.replace(/\.vue$/, '.js')

  return new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(path.join(path.resolve(), writeFilePath), finallyCode)
      resolve(writeFilePath)
    } catch (err) {
      reject(err)
    }
  })
}

export default compile
