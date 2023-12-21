import { describe, expect, it } from 'vitest'
import { matches as matchesData } from './data'
import { Game, selectMatches } from '~/api'

describe('Matches', () => {
  it('select', () => {
    const selected = selectMatches('2023-12-08', matchesData)
    const match = selected[0]
    expect(match.home.name === 'Juventus')
  })
})

describe('Game', () => {
  const match = matchesData['2023-12-08'][0]
  const game = new Game(match)

  it('generateXG', () => {
    const xg = game.generateXG(0.1)
    expect(xg).toBeGreaterThan(0)
    expect(xg).toBeLessThan(1)
  })

  it('attack', () => {
    const frame = game.attack()
    expect(frame.home.xg).toBeGreaterThanOrEqual(0)
  })

  it('play', () => {
    game.play(1, 0)
  })
})
