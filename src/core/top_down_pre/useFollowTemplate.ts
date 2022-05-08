import type { DataTableColumns } from 'naive-ui'
import { NTag } from 'naive-ui'
import type { Pair } from './static'

export const createFollowSetColumnTemplate = (terminators: string[], nonTerminators: string[]) => {
  const followColumns: DataTableColumns<Pair<string, string[]>> = [
    {
      key: 'key',
      title: '符号',
      defaultFilterOptionValues: ['non-terminator'],
      filterOptions: [
        { label: '非终结符', value: 'non-terminator' },
        { label: '终结符', value: 'terminator' },
      ],
      filter: (value, row) => {
        return (value === 'terminator'
          ? terminators.includes(row.key)
          : false)
              || (value === 'non-terminator'
                ? nonTerminators.includes(row.key)
                : false)
      },
    },
    {
      key: 'value',
      title: 'Follow 集',
      render: (row) => {
        return row.value.map((v) => {
          return h(NTag, { style: { marginRight: '6px' } }, { default: () => v })
        })
      },
    },
  ]
  return followColumns
}
