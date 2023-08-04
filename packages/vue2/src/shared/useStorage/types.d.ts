export interface Serializer<T> {
  read(raw: string): T
  write(value: T): string
}

export interface StorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
  removeItem(key: string): void
}

export interface UseStorageConfig {
  storage: StorageLike

  /**
   * 当 storage 中不存在数据时，写入默认值
   *
   * @default true
   */
  writeDefaults: boolean
}
