import type { Dir, Options, ResolvedOptions } from '../types'
import { DEFAULT_EXTENSIONS, DEFAULT_PATH, IMAGE_PATH_PREFIX } from './constants'
import { removeSlash } from './utils'

export function resolveOptions(options: Options): ResolvedOptions {
  const dirs: Dir[] = []

  if (options?.dirs) {
    
    options.dirs.forEach((dir) => {
      if (typeof dir === 'string') {
        dirs.push({
          path: removeSlash(dir),
        })
      }
    })
  }

  if (!dirs.length) {
    dirs.push({
      path: removeSlash(DEFAULT_PATH),
    })
  }

  const extensions = options?.extensions || DEFAULT_EXTENSIONS

  const compiler = options?.compiler || 'vue2'

  return {
    dirs,
    extensions,
    compiler,
  }
}
