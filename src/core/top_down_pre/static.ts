export const EMPTY = '@empty'
export const END = '@end'

export interface Law {
  left: string
  right: string[]
}

export interface Pair<T, V> {
  key: T
  value: V
}

// Record 转 Array
export const recordToArray = (record: Record<string, string[]>) => {
  const array: Pair<string, string[]>[] = []
  for (const key in record) {
    const value = record[key]
    array.push({ key, value })
  }
  return array
}
