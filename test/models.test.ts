import { describe, expect, it } from 'vitest'
import { Result, ResultTeam } from '~/models'

describe('ResultTeam', () => {
  const team = new ResultTeam('Arsenal')

  it('goalLog', () => {
    team.goalMinutes.push(...[9, 45])
    expect(team.goalLog).toMatchInlineSnapshot('"9\', 45\'"') // 试用
    expect(team.goalLog).toEqual('9\', 45\'')
  })

  it('reset', () => {
    team.reset()
    expect(team.goalMinutes.length).toEqual(0)
  })
})

describe('Result', () => {
  const home = new ResultTeam('Arsenal', 20, 2, 1.2, [2, 89])
  const away = new ResultTeam('Man City', 12, 1, 0.8, [47])
  const result = new Result(home, away, 'Premier League')

  it('add', () => {
    const home = new ResultTeam('Arsenal', 6, 1, 0.6, [89])
    const away = new ResultTeam('Man City', 4, 0, 0.4)
    const result2 = new Result(home, away, 'Premier League')
    const newResult = result.add(result2)
    expect(newResult.home.shots).toEqual(26)
    expect(~~(newResult.away.xg * 10)).toEqual(12)
    expect(newResult.home.score).toEqual(3)
    expect(newResult.home.goalMinutes).toEqual([2, 89, 89])
  })

  it('topGoalPeriods', () => {
    const goalMinutes = [20, 20, 89, 89, 47, 47, 8, 78]
    const topPeriods = result.topGoalPeriods(goalMinutes, 3)
    expect(topPeriods).toEqual([20, 47, 89])
  })

  it('divide', () => {
    const divide_result = result.divide(2)
    expect(divide_result.home.shots).toEqual(10)
    expect(~~(divide_result.away.xg * 10)).toEqual(4)
    expect(divide_result.away.score).toEqual(0)
    expect(divide_result.home.goalMinutes.length).toEqual(1)
    expect(divide_result.away.goalMinutes.length).toEqual(0)
  })

  it('buildProcessBar', () => {
    const bar = result.buildProgressBar(50)
    expect(bar).toEqual('█████░░░░░')
  })

  it('shotsProgressBar', () => {
    expect(result.shotsProgressBar).toEqual('██████░░░░')
  })

  it('xgProgressBar', () => {
    expect(result.xgProgressBar).toEqual('██████░░░░')
  })

  it('reset', () => {
    result.played = true
    result.reset()
    expect(result.played).toBeFalsy()
    expect(result.home.shots).toEqual(0)
  })
})
