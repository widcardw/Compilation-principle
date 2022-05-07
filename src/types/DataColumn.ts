import type { VNode } from 'vue'

export default interface DataColumn {
  key: string
  label: string
  width?: string
  render?: (data: any) => VNode
}
