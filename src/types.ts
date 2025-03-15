export interface Options {
  /**
   * Dirs
   *
   * @default 'src/assets/images'
   */
  dirs?: string[]
  /**
   * Extensions
   *
   * @default ['jpg', 'jpeg', 'png', 'svg', 'webp']
   */
  extensions?: string[]
  /**
   * Compiler
   *
   * @default 'vue2'
   */
  compiler?: 'vue2' | 'vue3'
}

export interface Dir {
  path: string
}

export interface ResolvedOptions extends Omit<Required<Options>, 'dirs'> {
  dirs: Dir[]
}
