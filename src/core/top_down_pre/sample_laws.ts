import type { Pair } from './static'
import { EMPTY } from './static'

interface Gramma {
  terminators: Array<string>
  nonTerminators: Array<string>
  laws: Array<Pair<string, string>>
}

export const gramma1: Gramma = {
  terminators: [EMPTY, '+', '*', '(', ')', 'id'],
  nonTerminators: ['E', 'T', 'E\'', 'T\'', 'F', 'S'],
  laws: [{
    key: 'E',
    value: 'T E\'',
  }, {
    key: 'E\'',
    value: '+ T E\' | @empty',
  }, {
    key: 'T',
    value: 'F T\'',
  }, {
    key: 'T\'',
    value: '* F T\' | @empty',
  }, {
    key: 'F',
    value: '( E ) | id',
  }, {
    key: 'S',
    value: 'E',
  }],
}

export const gramma2: Gramma = {
  terminators: [EMPTY, 'a', 'b'],
  nonTerminators: ['S', 'A', 'B'],
  laws: [{
    key: 'S',
    value: 'B A B',
  }, {
    key: 'A',
    value: 'a A | @empty',
  }, {
    key: 'B',
    value: 'b B | @empty',
  }],
}

