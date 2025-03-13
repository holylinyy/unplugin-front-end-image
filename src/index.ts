import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import { createUnplugin } from 'unplugin'
import { PLUGIN_NAME } from './constants'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  console.log(1231234, options)
  return {
    name: 'unplugin-front-end-image',
    transformInclude(id) {
      return id.endsWith('main.ts')
    },
    transform(code) {
      return code.replace('__UNPLUGIN__', `Hello Unplugin! ${options}`)
    },
    webpack(compiler) {
      compiler.hooks.afterCompile.tap(PLUGIN_NAME, (compilation) => {

      })
    },
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
