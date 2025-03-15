import { ResolvedOptions } from "../../types"

export function removeSlash(path: string): string {
  if (path.startsWith('/'))
    path = path.slice(1)
  if (path.endsWith('/'))
    path = path.slice(0, path.length - 1)
  return path
}

export const toCamelCase = (str: string) => {
  return str.replace(/-([a-z])/g, (m, w) => w.toUpperCase())
}


export function getName(path: string, options: ResolvedOptions) {
  let name = ''
  for (const dir of options.dirs) {
    if (path.startsWith(dir.path)) {
      name = path.slice(dir.path.length + 1)
      break
    }
  }

  const dotIndex = name.indexOf('.')
  if (dotIndex !== -1)
    name = name.slice(0, dotIndex).replace(/\//g, '-')

  return name
}
