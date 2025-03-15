import type { UnpluginFactory } from 'unplugin'
import type { Options } from './types'
import { createUnplugin } from 'unplugin'
import { PLUGIN_NAME } from './constants'
import { UNPLUGIN_NAME } from './core/constants'
import { createContext } from './core/context'
import { generateImageComponentPath, isImagePath, resolveImagePath } from './core/loader'

export const unpluginFactory: UnpluginFactory<Options | undefined> = (options) => {
  const ctx = createContext(options || {})
  return {
    name: UNPLUGIN_NAME,
    
    resolveId(id) {
      if (isImagePath(id)) {
        return generateImageComponentPath(id)
      }
      return null
    },
    loadInclude(id) {
      return isImagePath(id)
    },

    load(id) {
      if (isImagePath(id)) {
        const { name, ext } = resolveImagePath(id, ctx.options)
        const pic = ctx.searchImage(name, ext)
        const image = pic?.file
        return `
          import img from '${image}'
          console.log(\`${id}\`)
          export default {
            render(h) {
              return h('img', {
                attrs: { src: img, ...this.$attrs },
                on: { ...this.$listeners }
              })
            }
          }
      `
      }
      return null
    },
    webpack(compiler) {
      let watcher: any
      compiler.hooks.beforeCompile.tapPromise(PLUGIN_NAME, async (c) => {
        watcher = await ctx.searchImages()
      })
      compiler.hooks.done.tap('WatchDirectoryPlugin', () => {
        if (watcher) {
          watcher.close();
        }
      });
    }
  }
}

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
