import { describe, expect, it } from 'vitest'
import { Game } from '~/composables/logic'

describe('Game', () => {
  const game = new Game(625, 75, 38, 363, 41, 38)

  it('attack', () => {
    expect(game.attack(0, 0, 0, 0)).toMatchInlineSnapshot(`
      [
        0,
        0,
        0,
        0,
      ]
    `)
  })

  it('reset', () => {
    game.reset()
    expect(game.state.value.timing).toEqual(0)
  })

  it('play', () => {
    game.play(90, 0)
  })
})
