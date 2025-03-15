import type { Options, ResolvedOptions } from '../types'
import process from 'node:process'
import { resolveOptions } from './resolveOptions'
import fg from 'fast-glob'
import createDebugger from 'debug'
import { UNPLUGIN_NAME } from './constants'
import chokidar from 'chokidar'
import { getName } from './utils'
import { parse, resolve } from 'node:path'
import fs from 'fs/promises'
const debug = createDebugger(`${UNPLUGIN_NAME}:context`)

export class Context {
  root = process.cwd()
  options: ResolvedOptions
  ready: any
  _images: Map<string, Map<string, {
    file: string,
    name: string,
    ext: string
  }>> = new Map()

  constructor(private rawOptions: Options) {
    this.options = resolveOptions(rawOptions)
    
  }

  addImage(path: string) {
    const ext = parse(`/${path}`).ext.slice(1)
   
    if (!this.options.extensions.includes(ext))
      return
    console.log('add image', path)
    
    this.collectImage(path)
  }

  delImage(path: string) {
    const ext = parse(`/${path}`).ext.slice(1)
    if (!this.options.extensions.includes(ext))
      return
    const name = getName(path, this.options)
    const map = this._images.get(name)
    map?.delete(ext)
    if (map?.size === 0) {
      this._images.delete(name)
    }
  }

  async searchImages() {
    if (this.ready) return this.ready
    let resolve: any
    this.ready = new Promise((_resolve) => {
      resolve = _resolve
    })
    
    const dirs = this.options.dirs
    const extensions = this.options.extensions.join(',')
    const sources = dirs.map(dir => `${dir.path}/**/*.{${extensions}}`)
    const imageFiles = fg.sync(sources, {
      ignore: ['**/node_modules/**'],
      onlyFiles: true,
      cwd: this.root,
    })


    for (const imageFile of imageFiles) {
      debug(`collect image: ${imageFile}`)
      this.collectImage(imageFile)
    }
    const watcher = chokidar.watch(this.options.dirs.map(dir => dir.path))
    this.setupWatcher(watcher)
    resolve(watcher)
  }

  searchImage(name: string, ext: string) {
    const map = this._images.get(name)
    const pic = map?.get(ext)
    return pic
  }

  collectImage(path: string) {
    const camelCaseName = getName(path, this.options)
    const ext = path.split('.').pop()!
    let typeMap: Map<string, {
      file: string,
      name: string,
      ext: string
    }> = new Map()
    if (this._images.has(camelCaseName)) {
      typeMap = this._images.get(camelCaseName)!
    }
    typeMap.set(ext, {
      file: resolve(this.root, path),
      name: camelCaseName,
      ext,
    })
    this._images.set(camelCaseName, typeMap)
  }
  setupWatcher(watcher: any) {
    watcher
      .on('add', (path: string) => {
        debug('add path =>', path)
        this.addImage(path)
      })
      .on('unlink', (path: string) => {
        debug('unlink path =>', path)
        this.delImage(path)
      })
  }
}
export function createContext(rawOptions: Options): Context {
  return new Context(rawOptions)
}
