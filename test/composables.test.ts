import { describe, expect, it } from 'vitest'
import { Game } from '~/composables/logic'

describe('Game', () => {
  const game = new Game(0.14, 0.11, 0.53, 0.32)

  it('who scored', () => {
    expect(game.whoScored(0, 0)).toMatchInlineSnapshot(`
      [
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
