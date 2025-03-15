import { ResolvedOptions } from "../types"
import { IMAGE_PATH_PREFIX } from "./constants"

export function generateImageComponentPath(path: string): string {
  const dotIndex = path.indexOf('.')
  const extensionStr = path.slice(dotIndex + 1)
  const beforeStr = path.slice(0, dotIndex)
  const afterStr = `?${extensionStr}`
  return `${beforeStr}.vue${afterStr}`
  
}

export const isImagePath = (path: string): boolean  => {
  const reg = new RegExp(`${IMAGE_PATH_PREFIX}`)
  return reg.test(path)
}

export const resolveImagePath = (path: string, options: ResolvedOptions) => {
  path = path.replace(IMAGE_PATH_PREFIX, '').replace('.vue', '')
  
  const questionIndex = path.indexOf('?')
  let ext = path.slice(questionIndex + 1)
  let name = path.slice(0, questionIndex).replace(/\//g, '-')
  return {
    ext,
    path,
    name
  }
}
